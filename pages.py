'''
“pages.py”：包含项目的所有界面设计，
                 当部件事件发生时，会被调用以更新界面内容
'''

import ipywidgets as widgets
import login                      #导入login.py模块，用来检验用户信息
import initial
import pfunction

#---------------1.关闭上一个页面，并重新加载，返回新的grid------------#
def close_FrontPage(out,grid):
    grid.close()
    return initial.initGrid(out)


#----------------------2.登录界面 暂时没有实际意义--------------------#
def loginPage(out,grid):
    with open('./image/leftup.png', 'rb') as f1:
        leftup = f1.read()
        grid[1:6,:4] = widgets.Image(value = leftup)
    f1.close()
    
    with open('./image/rightdown.png', 'rb') as f2:
        rightdown = f2.read()
        grid[15:,25:29] = widgets.Image(value = rightdown)
    f2.close()
    
    stu_number = widgets.Text(description = 'StudentID',value = '20200000',disabled =True,layout = widgets.Layout(width = '6.5cm'))
    user_password = widgets.Text(description = 'Password',value = '123456',disabled =True,layout = widgets.Layout(width = '6.5cm'))
    login_button = widgets.Button(description = 'start',
                                  icon = 'info',
                                  style = {'button_color':'#004080'}, 
                                  button_style = 'info',
                                  layout = widgets.Layout(width = '3cm')
                                  )
    temp1 = widgets.Label(layout = widgets.Layout(height = '0.7cm'))
    temp2 = widgets.Label(layout = widgets.Layout(height = '0.5cm'))
    temp3 = widgets.Label(layout = widgets.Layout(width = '2.5cm'))
    login_ui = widgets.VBox([temp1,stu_number,user_password,temp2,widgets.HBox([temp3,login_button])])
    children = [login_ui]
    tab = widgets.Tab(layout = widgets.Layout(width = '8.5cm',height = '5.5cm'))
    tab.children = children
    tab.set_title(0,'Login') 
    
    grid[6:11,10:17] = tab

    #设置按钮”start“事件
    def start_button(b):
        temp1.value = ''
        n = stu_number.value
        p = user_password.value
        if login.checkUser(n,p):
            contentsPage(out,grid)
        else:
            temp1.value = '用户名/密码不正确！'
    login_button.on_click(start_button)
        
    return


#---------------------------3.登陆成功后跳转的界面-----------------------#
def contentsPage(out,grid):
    grid = close_FrontPage(out,grid)
    
    with open('./image/leftup.png', 'rb') as f1:
        leftup = f1.read()
        grid[1:6,:4] = widgets.Image(value = leftup)
    f1.close()
    
    with open('./image/rightdown.png', 'rb') as f2:
        rightdown = f2.read()
        grid[15:,25:29] = widgets.Image(value = rightdown)
    f2.close()

    with open('./image/contents.png', 'rb') as f3:
        content = f3.read()
        grid[9:14,7:12] = widgets.Image(value = content)
    f3.close()

    knowledge_button = widgets.Button(description = '知识梳理',
                                      style = {'button_color':'#004080'}, 
                                      button_style = 'info',
                                      layout = widgets.Layout(height = '1cm'))
    process_button = widgets.Button(description = '过程演示',
                                    style = {'button_color':'#004080'}, 
                                    button_style = 'info',
                                    layout = widgets.Layout(height = '1cm'))
    test_button = widgets.Button(description = '巩固测试',
                                 style = {'button_color':'#004080'}, 
                                 button_style = 'info',
                                 layout = widgets.Layout(height = '1cm'))
    temp = widgets.Label(layout = widgets.Layout(height = '1cm'))
    temp1 = widgets.Label(layout = widgets.Layout(height = '1cm'))
    contents_ui = widgets.VBox([knowledge_button,temp,process_button,temp1,test_button])
    grid[6:15,16:21] = contents_ui

    '''
    设置按钮事件:“知识梳理”、“过程演示”、“巩固测试”
    '''
    def act_knowledgeButton(b):
        knowledgePage(out,grid)
    knowledge_button.on_click(act_knowledgeButton)
    
    def act_processButton(b):
        processPage(out,grid)
    process_button.on_click(act_processButton)
    
    def act_testButton(b):
        testPage(out,grid)
    test_button.on_click(act_testButton)

    
    return

#--------------------------------4.知识梳理界面---------------------------#
def knowledgePage(out,grid):
    
    grid = close_FrontPage(out,grid)
    grid[0,0:29].description = '知识梳理'
    grid[19,1:3] = widgets.Dropdown(options=[('目       录', 0), ('过程演示', 1), ('巩固测试', 2)],
                                    layout = widgets.Layout(width = '5cm'),
                                    description='跳转到： ')
    grid[19,9:10] = widgets.Button(description = '进入',
                                    style = {'button_color':'#004080'}, 
                                    button_style = 'info',
                                    layout = widgets.Layout(width = '2.5cm'))
    grid[19,14:16] = widgets.Button(description = '更改',
                                    style = {'button_color':'#004080'}, 
                                    button_style = 'info',
                                    layout = widgets.Layout(width = '2.5cm'))
    grid[19,21:23] = widgets.Button(description = '保存',
                                    style = {'button_color':'#004080'}, 
                                    button_style = 'info',
                                    layout = widgets.Layout(width = '2.5cm'))

    #显示图片
    with open('./image/teacher.jpg', 'rb') as f:
        teacher_image = f.read()
        grid[5:13,3:9] = widgets.Image(value = teacher_image)
    f.close()

    #显示知识点内容
    with open('./doc/datapath.txt', 'r') as f1:
        datapath_txt = f1.read()
    f1.close()
    datapath_accordion = widgets.Accordion(children=[widgets.Textarea(value=datapath_txt,disabled=True,layout=widgets.Layout(height='6cm',width='11cm'))])
    datapath_accordion.set_title(0, '知识内容')
    
    with open('./doc/cache.txt', 'r') as f2:
        cache_txt = f2.read()
    f2.close()
    cache_accordion = widgets.Accordion(children=[widgets.Textarea(value=cache_txt,disabled=True,layout=widgets.Layout(height='6cm',width='11cm')),widgets.Output()])
    cache_accordion.set_title(0, '知识内容')
    cache_accordion.set_title(1, '映射计算')
    
    tab_title = ['数据通路', 'Cache']
    tab = widgets.Tab(layout = widgets.Layout(width = '13cm',height='10cm'))
    tab.children = [datapath_accordion, cache_accordion]
    for i in range(2):
        tab.set_title(i, tab_title[i])
    grid[2:18,11:17] = tab

    #更改、保存按钮实现
    def update(b):
        if grid[2:18,11:17].selected_index == 0:
            grid[2:18,11:17].children[0].children[0].disabled = False
        elif grid[2:18,11:17].selected_index == 1:
            grid[2:18,11:17].children[1].children[0].disabled = False
    grid[19,14:16].on_click(update)

    def save(b):
        if grid[2:18,11:17].selected_index == 0:
            text = grid[2:18,11:17].children[0].children[0].value
            with open('./doc/datapath.txt', 'w') as fd:
                fd.write(text)
            fd.close()
            grid[2:18,11:17].children[0].children[0].disabled = True
        elif grid[2:18,11:17].selected_index == 1:
            text = grid[2:18,11:17].children[1].children[0].value
            with open('./doc/cache.txt', 'w') as fc:
                fc.write(text)
            fc.close()
            grid[2:18,11:17].children[1].children[0].disabled = True
    grid[19,21:23].on_click(save)

    #跳转页面
    def jumpToPage(b):
        value = grid[19,1:3].value
        if value == 0:
            contentsPage(out,grid)
        elif value == 1:
            processPage(out,grid)
        elif value == 2:
            testPage(out,grid)
    grid[19,9:10].on_click(jumpToPage)
    
    return

#----------------------------5.过程演示界面---------------------------#
def initProcess_Left(grid):
    leftab_title = ['Code','DataPath', 'Cache']

    # Code界面是一个out，里面是一个grid
    leftCode_out = widgets.Output()
    leftCode_grid = widgets.GridspecLayout(20,10,width = 'auto',height = '9.6cm')
    leftCode_grid[0:19,0:10] = widgets.Textarea(layout = widgets.Layout(width = 'auto',height='8.6cm'))
    leftCode_grid[19,2] = widgets.Button(description = '清空',
                                         layout = widgets.Layout(width = '2cm'))
    leftCode_grid[19,7] = widgets.Button(description = '运行',
                                         layout = widgets.Layout(width = '2cm'))
    with leftCode_out:
        display(leftCode_grid)

    # DataPath界面是一个Out
    leftDataPath_out = widgets.Output(layout={'width':'16.8cm','height':'9.6cm'})
    pfunction.draw_datapath(['','Nothing...'],leftDataPath_out)

    # Cache界面是一个out,里面是一个Grid
    leftCache_out = widgets.Output()
    leftCache_grid = widgets.GridspecLayout(3,1,height='9.45cm')
    leftCache_grid[0:2,0] = widgets.Button(description = 'process',
                                      layout = widgets.Layout(width = 'auto',
                                                              height = 'auto'))
    leftCache_grid[2:3,0] = widgets.Button(description = 'replace',
                                      layout = widgets.Layout(width = 'auto',
                                                              height = 'auto'))
    with leftCache_out:
        display(leftCache_grid)

    # 过程演示界面中左半部分组件
    leftab = widgets.Tab(layout = widgets.Layout(width = 'auto',height = 'auto'),
                         selected_index = 0)
    leftab.children = [leftCode_out,leftDataPath_out,leftCache_out]
    for i in range(len(leftab.children)):
        leftab.set_title(i, leftab_title[i])
    grid[1:19,0:20] = leftab

    left = {'code':leftCode_grid,
            'datapath':leftDataPath_out,
            'cache':leftCache_grid}
    
    return [leftab,left]

#----------返回：存放三种rightab的字典-------#
def initProcess_Right(grid):

    code_rightab = widgets.Tab(layout = widgets.Layout(width = 'auto',height = 'auto'))
    datapath_rightab = widgets.Tab(layout = widgets.Layout(width = 'auto',height = 'auto'))
    cache_rightab = widgets.Tab(layout = widgets.Layout(width = 'auto',height = 'auto'))

    #---------1) Code 右半部分---------#
    with open('./doc/instructions.txt','r') as f:
        instructions = f.read()
    f.close()
    code_rchildren = widgets.Accordion(children = [widgets.Textarea(value = instructions,
                                                                    disabled = True,
                                                                    layout = widgets.Layout(width = 'auto',height = '6cm')),
                                                   widgets.Textarea(disabled = True,
                                                                    layout = widgets.Layout(width = 'auto',height = '6cm'))],
                                       selected_index = None)
    code_rchildren.set_title(0,'Instructions')
    code_rchildren.set_title(1,'Event Log')
    code_rightab.children = [code_rchildren]
    code_rightab.set_title(0,'Information')

    #-------2) Datapth 右半部分--------#
    datapath_rchildren = widgets.GridspecLayout(33,4,width='auto',height='auto')
    datapath_rchildren[0,0] = widgets.Button(description='Name',
                                             style = {'button_color':'#004080'}, 
                                             button_style = 'info',
                                             layout = widgets.Layout(width='auto',height='auto'))
    datapath_rchildren[0,1] = widgets.Button(description='Alias',
                                             style = {'button_color':'#004080'}, 
                                             button_style = 'info',
                                             layout = widgets.Layout(width='auto',height='auto'))
    datapath_rchildren[0,2:4] = widgets.Button(description='Value',
                                             style = {'button_color':'#004080'}, 
                                             button_style = 'info',
                                             layout = widgets.Layout(width='auto',height='auto'))
    alias = ['zero','ra','sp','gp','tp','t0','t1','t2',
             'fp','s0','a0','a1','a2','a3','a4','a5',
             'a6','a7','s1','s2','s3','s4','s5','s6',
             's7','s8','s9','s10','t3','t4','t5','t6']
    for i in range(1,33):
        for j in range(3):
            if j == 0:
                datapath_rchildren[i,j] = widgets.Button(description = 'x' + str(i-1),
                                                         disabled = True,
                                                         layout = widgets.Layout(width='auto',height='auto'))
            elif j == 1:
                datapath_rchildren[i,j] = widgets.Button(description = alias[i-1],
                                                         disabled = True,
                                                         layout = widgets.Layout(width='auto',height='auto'))
            elif j == 2:
                datapath_rchildren[i,2:4] = widgets.Button(description = "0x00000000",
                                                         disabled = True,
                                                         layout = widgets.Layout(width='auto',height='auto'))
            
    datapath_rightab.children = [datapath_rchildren]
    datapath_rightab.set_title('0','Register')

    #---------3) Cache 右半部分--------#
    cache_rchildren = widgets.Text(description='cache')
    cache_rightab.children = [cache_rchildren]
    cache_rightab.set_title('0','Parameter')

    grid[1:19,20:30] = code_rightab

    right = {'code':code_rightab,
             'datapath':datapath_rightab,
             'cache':cache_rightab}
    
    return right

def processPage(out,grid):
    
    #-------1）界面周边布局------#
    grid = close_FrontPage(out,grid)
    grid[0,0:29].description = '过程演示'
    grid[19,1:3] = widgets.Dropdown(options=[('目       录', 0), ('知识梳理', 1), ('巩固测试', 2)],
                                    layout = widgets.Layout(width = '5cm'),
                                    description='跳转到： ')
    grid[19,9:10] = widgets.Button(description = '进入',
                                    style = {'button_color':'#004080'}, 
                                    button_style = 'info',
                                    layout = widgets.Layout(width = '2.5cm'))
    grid[19,23:28] = widgets.Play()

    #---------2) 界面中央---------#
    left_list = initProcess_Left(grid)
    right = initProcess_Right(grid)
    pfunction.left_right_link(grid,left_list[0],right)
    pfunction.main_function(grid,left_list,right)

    #---------3) 跳转页面---------#
    def jumpToPage(b):
        value = grid[19,1:3].value
        if value == 0:
            contentsPage(out,grid)
        elif value == 1:
            knowledgePage(out,grid)
        elif value == 2:
            testPage(out,grid)
    grid[19,9:10].on_click(jumpToPage)
    
    return

#-----------------------------6.巩固测试界面---------------------------#
def testPage(out,grid):
    grid = close_FrontPage(out,grid)
    grid[0,0:29].description = '巩固测试'
    grid[19,9:11] = widgets.Dropdown(options=[('目       录', 0), ('知识梳理', 1), ('过程演示', 2)],
                                    layout = widgets.Layout(width = '5cm'),
                                    description='跳转到： ')
    grid[19,17:18] = widgets.Button(description = '进入',
                                    style = {'button_color':'#004080'}, 
                                    button_style = 'info',
                                    layout = widgets.Layout(width = '2.5cm'))

    #显示左半部分内容：测试题
    leftab = widgets.Tab(layout = widgets.Layout(width = 'auto',height = 'auto'))
    leftab.children = [widgets.Text()]
    leftab.set_title(0,'Little Test')
    grid[1:19,0:20] = leftab

    #显示右半部分内容：成绩/分析/时间
    rightab = widgets.Tab(layout = widgets.Layout(width = 'auto',height = 'auto'))
    rightab.children = [widgets.Text(description='Something',layout = widgets.Layout(width = 'auto',height = 'auto'))]
    rightab.set_title(0,'Contents')
    grid[1:19,20:30] = rightab
    

    #跳转页面
    def jumpToPage(b):
        value = grid[19,9:11].value
        if value == 0:
            contentsPage(out,grid)
        elif value == 1:
            knowledgePage(out,grid)
        elif value == 2:
            processPage(out,grid)
    grid[19,17:18].on_click(jumpToPage)
    
    return
