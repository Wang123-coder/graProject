'''
 “巩固测试”
'''

from ipywidgets import DOMWidget, register
import ipywidgets as widgets
from traitlets import Unicode, Bool
from IPython.display import display, Javascript
import time

@register
class TestCondition(DOMWidget):
    _view_name = Unicode('TestCircleView').tag(sync=True)
    _view_module = Unicode('test_circle').tag(sync=True)
    _view_module_version = Unicode('0.1.0').tag(sync=True)

    # Attributes
    isDo = Bool(False).tag(sync=True)      # 是否做过   深蓝（做过）  灰色（没做过）
    isRight = Bool(False).tag(sync=True)   #是否正确   红色（错)
    color = Unicode('#F5F5F5').tag(sync=True)  #圆的颜色  
    test_index = Unicode().tag(sync=True)  #题目序号

#  leftgrid：11，5
#  rightgrid：7，6
def test_function(leftgrid,rightgrid):

    display(Javascript("require.config({paths: {d3: 'https://d3js.org/d3.v5.min'}});"))
    display(Javascript(filename="./js/test_circle.js"))

    #   测试题目
    test_label = [widgets.Label(value = '1. 缓存（Cache）存在于__________'),
                  widgets.Label(value = '2. Cache的功能是________。'),
                  widgets.Label(value = '3. 以下关于Cache的叙述中，正确的是'),
                  widgets.Label(value = '4. 在主存和CPU之间增加Cache的目的是_______'),
                  widgets.Label(value = '5. 在计算机系统中，以下关于高速缓存 (Cache) 的说法正确的是（ ）'),
                  widgets.VBox([widgets.Label(value = '6. 在Cache的地址映射中，若主存中的任意一块均可映射到Cache内的任意一块的位置上，则这种方法称'),
                                widgets.Label(value = '   为________')]),
                  widgets.VBox([widgets.Label(value = '7. 计算机主存容量8MB，分为4096个主存块，cache有64KB，若按照采用直接映射方式，cache有'),
                                widgets.Label(value = '    ________块。')]),
                  widgets.VBox([widgets.Label(value = '8. 计算机主存容量8MB，分为4096个主存块，cache有64KB，若按照采用直接映射方式，Cache的字'),
                                widgets.Label(value = '   块内地址为________位。')]),
                  widgets.VBox([widgets.Label(value = '9. 计算机主存容量8MB，分为4096个主存块，cache有64KB，若按照采用直接映射方式，Cache的字'),
                                widgets.Label(value = '   块地址为________位。')]),
                  widgets.VBox([widgets.Label(value = '10. 一个组相联高速缓存由64个字块组成，每个字块有256字节，分为8组，主存有4096个字块。请问：'),
                                widgets.Label(value = '   主存地址有________位。')])]
    
    #   选项
    test1_A = widgets.HBox([widgets.Button(description = 'A',layout = widgets.Layout(width = '0.8cm',height = '0.7cm')),
                            widgets.Button(description = '数据和信号',disabled = True,layout = widgets.Layout(width = 'auto',height = '0.7cm'))])
    test1_B = widgets.HBox([widgets.Button(description = 'B',layout = widgets.Layout(width = '0.8cm',height = '0.7cm')),
                            widgets.Button(description = '内存和硬盘之间',disabled = True,layout = widgets.Layout(width = 'auto',height = '0.7cm'))])
    test1_C = widgets.HBox([widgets.Button(description = 'C',layout = widgets.Layout(width = '0.8cm',height = '0.7cm')),
                            widgets.Button(description = '硬盘内部',disabled = True,layout = widgets.Layout(width = 'auto',height = '0.7cm'))])
    test1_D = widgets.HBox([widgets.Button(description = 'D',layout = widgets.Layout(width = '0.8cm',height = '0.7cm')),
                            widgets.Button(description = 'CPU内部',disabled = True,layout = widgets.Layout(width = 'auto',height = '0.7cm'))])
    
    test2_A = widgets.HBox([widgets.Button(description = 'A',layout = widgets.Layout(width = '0.8cm',height = '0.7cm')),
                            widgets.Button(description = '数值运算',disabled = True,layout = widgets.Layout(width = 'auto',height = '0.7cm'))])
    test2_B = widgets.HBox([widgets.Button(description = 'B',layout = widgets.Layout(width = '0.8cm',height = '0.7cm')),
                            widgets.Button(description = '逻辑运算',disabled = True,layout = widgets.Layout(width = 'auto',height = '0.7cm'))])
    test2_C = widgets.HBox([widgets.Button(description = 'C',layout = widgets.Layout(width = '0.8cm',height = '0.7cm')),
                            widgets.Button(description = '存储数据和指令',disabled = True,layout = widgets.Layout(width = 'auto',height = '0.7cm'))])
    test2_D = widgets.HBox([widgets.Button(description = 'D',layout = widgets.Layout(width = '0.8cm',height = '0.7cm')),
                            widgets.Button(description = '控制程序',disabled = True,layout = widgets.Layout(width = 'auto',height = '0.7cm'))])

    test3_A = widgets.HBox([widgets.Button(description = 'A',layout = widgets.Layout(width = '0.8cm',height = '0.7cm')),
                            widgets.Button(description = '在容量确定的情况下，替换算法的时间复杂度是影响Cache命中率的关键因素',
                                           disabled = True,layout = widgets.Layout(width = 'auto',height = '0.7cm'))])
    test3_B = widgets.HBox([widgets.Button(description = 'B',layout = widgets.Layout(width = '0.8cm',height = '0.7cm')),
                            widgets.Button(description = 'Cache的设计思想是在合理成本下提高命中率',disabled = True,layout = widgets.Layout(width = 'auto',height = '0.7cm'))])
    test3_C = widgets.HBox([widgets.Button(description = 'C',layout = widgets.Layout(width = '0.8cm',height = '0.7cm')),
                            widgets.Button(description = 'Cache的设计目标是容量尽可能与主存容量相等',disabled = True,layout = widgets.Layout(width = 'auto',height = '0.7cm'))])
    test3_D = widgets.HBox([widgets.Button(description = 'D',layout = widgets.Layout(width = '0.8cm',height = '0.7cm')),
                            widgets.Button(description = 'CPU中的Cache容量应大于CPU之外的Cache容量',disabled = True,layout = widgets.Layout(width = 'auto',height = '0.7cm'))])

    test4_A = widgets.HBox([widgets.Button(description = 'A',layout = widgets.Layout(width = '0.8cm',height = '0.7cm')),
                            widgets.Button(description = '扩大主存的容量',disabled = True,layout = widgets.Layout(width = 'auto',height = '0.7cm'))])
    test4_B = widgets.HBox([widgets.Button(description = 'B',layout = widgets.Layout(width = '0.8cm',height = '0.7cm')),
                            widgets.Button(description = '增加CPU中通用寄存器的数量',disabled = True,layout = widgets.Layout(width = 'auto',height = '0.7cm'))])
    test4_C = widgets.HBox([widgets.Button(description = 'C',layout = widgets.Layout(width = '0.8cm',height = '0.7cm')),
                            widgets.Button(description = '解决CPU和主存之间的速度匹配',disabled = True,layout = widgets.Layout(width = 'auto',height = '0.7cm'))])
    test4_D = widgets.HBox([widgets.Button(description = 'D',layout = widgets.Layout(width = '0.8cm',height = '0.7cm')),
                            widgets.Button(description = '代替CPU中的寄存器工作',disabled = True,layout = widgets.Layout(width = 'auto',height = '0.7cm'))])

    test5_A = widgets.HBox([widgets.Button(description = 'A',layout = widgets.Layout(width = '0.8cm',height = '0.7cm')),
                            widgets.Button(description = 'Cache的容量通常大于主存的存储容量',disabled = True,layout = widgets.Layout(width = 'auto',height = '0.7cm'))])
    test5_B = widgets.HBox([widgets.Button(description = 'B',layout = widgets.Layout(width = '0.8cm',height = '0.7cm')),
                            widgets.Button(description = '通常由程序员设置Cache的内容和访问速度',disabled = True,layout = widgets.Layout(width = 'auto',height = '0.7cm'))])
    test5_C = widgets.HBox([widgets.Button(description = 'C',layout = widgets.Layout(width = '0.8cm',height = '0.7cm')),
                            widgets.Button(description = 'Cache 的内容是主存内容的副本',disabled = True,layout = widgets.Layout(width = 'auto',height = '0.7cm'))])
    test5_D = widgets.HBox([widgets.Button(description = 'D',layout = widgets.Layout(width = '0.8cm',height = '0.7cm')),
                            widgets.Button(description = '多级Cache仅在多核cpu中使用',disabled = True,layout = widgets.Layout(width = 'auto',height = '0.7cm'))])

    #    6-10题目文本输入框
    test6_text = widgets.Text()
    test7_text = widgets.Text()
    test8_text = widgets.Text()
    test9_text = widgets.Text()
    test10_text = widgets.Text()

        #   解析内容
    answer_label = [widgets.Label(value = '[解析] D。Cache介于CPU和内容之间的高速小容量存储器称为高速缓冲存储器，集成在CPU内部。'),
                    widgets.Label(value = '[解析] C。Cache的功能是存储数据和指令。'),
                    widgets.Label(value = '[解析] B。Cache是一个高速小容量的临时存储器，设计思想是提高命中率。'),
                    widgets.Label(value = '[解析] C。Cache提出来的目的就是解决CPU和主存之间速度不匹配的问题。'),
                    widgets.Label(value = '[解析] C。Cache 的内容是主存内容的副本。'),
                    widgets.Label(value = '[解析] 全相联映射：主存块可映射Cache的任意一块中。'),
                    widgets.Label(value = '[解析] 块容量 = 8MB / 4096 = 2KB, 64KB / 2B = 32个块'),
                    widgets.Label(value = '[解析] 块容量 = 8MB / 4096 = 2KB（11位）'),
                    widgets.Label(value = '[解析] Cache有32块（2的5次方），块地址5位'),
                    widgets.Label(value = '[解析] 主存容量4096 * 256 = 1MB（2的20次方）,主存地址20位')]
    temp_label = widgets.Label()

    start = widgets.Button(description = '重做',layout = widgets.Layout(width = '2cm'))
    submit = widgets.Button(description = '提交',layout = widgets.Layout(width = '2cm'))

    test_out = []
    test_answer_option = [[test1_A,test1_B,test1_C,test1_D],
                          [test2_A,test2_B,test2_C,test2_D],
                          [test3_A,test3_B,test3_C,test3_D],
                          [test4_A,test4_B,test4_C,test4_D],
                          [test5_A,test5_B,test5_C,test5_D],
                          [test6_text],
                          [test7_text],
                          [test8_text],
                          [test9_text],
                          [test10_text]]

    for i in range(10):
        test_out.append(widgets.Output(layout = {'width':'auto','height':'auto'}))
        with test_out[i]:
            display(test_label[i])
            for j in range(len(test_answer_option[i])):
                display(test_answer_option[i][j])
                          
    for i in range(10):
        leftgrid[i,:] = test_out[i]
        
    leftgrid[10,1] = start
    leftgrid[10,3] = submit

    score_button_label = widgets.Button(description = '最新成绩',button_style = 'info',layout = widgets.Layout(width = 'auto',height = '0.8cm'))
    score_button = widgets.Button(description = '',disabled = False,layout = widgets.Layout(width = 'auto',height = '0.8cm'))

    condition_label = widgets.Button(description = '解题情况',button_style = 'info',disabled = True,layout = widgets.Layout(width = 'auto',height = '0.8cm'))

    condition = []
    
    for i in range(10):
        condition.append(TestCondition(test_index = str(i + 1)))

    rightgrid[0,0:2] = score_button_label
    rightgrid[0,2:6] = score_button
    rightgrid[2,1:5] = condition_label
    rightgrid[3,0] = condition[0]
    rightgrid[3,1] = condition[1]
    rightgrid[3,2] = condition[2]
    rightgrid[3,3] = condition[3]
    rightgrid[3,4] = condition[4]
    rightgrid[3,5] = condition[5]
    rightgrid[4,0] = condition[6]
    rightgrid[4,1] = condition[7]
    rightgrid[4,2] = condition[8]
    rightgrid[4,3] = condition[9]

    # 按钮事件
    def submit_click(b):
        score = 0
        for i in range(10):
            if condition[i].isRight == True:
                score = score + 10
                condition[i].color = '#F5F5F5'
            else:
                condition[i].color = 'red'
        score_button.description = str(score)

        for i in range(10):
            with test_out[i]:
                display(answer_label[i])

        for i in range(10):
            for j in range(len(test_answer_option[i])):
                if len(test_answer_option[i]) == 1:
                    test_answer_option[i][j].disabled = True
                else:
                    test_answer_option[i][j].children[0].disabled = True
        
    submit.on_click(submit_click)
    
    def start_click(b):
    
        for i in range(10):
            test_out[i].clear_output()
            
            for k in range(len(test_answer_option[i])):
                
                if len(test_answer_option[i]) == 1:
                    test_answer_option[i][k].disabled = False
                    test_answer_option[i][k].value = ''
                else:
                    test_answer_option[i][k].children[0].disabled = False
                    test_answer_option[i][k].children[0].style = {}
                    test_answer_option[i][k].children[0].button_style = ''
                    
            with test_out[i]:
                display(test_label[i])
                for j in range(len(test_answer_option[i])):
                    display(test_answer_option[i][j])

        for i in range(6):
            rightgrid[3,i].color = '#F5F5F5'
            rightgrid[3,i].isDo = False
            rightgrid[3,i].isRight = False
            if i < 4:
                rightgrid[4,i].color = '#F5F5F5'
                rightgrid[4,i].isDo = False
                rightgrid[4,i].isRight = False

        #score_button.description = ''
        
    start.on_click(start_click)
        
    def test1_A_click(b):  #错
        b.style = {'button_color':'#004080'}
        b.button_style = 'info'

        test1_B.children[0].button_style = ''
        test1_B.children[0].style = {}

        test1_C.children[0].button_style = ''
        test1_C.children[0].style = {}

        test1_D.children[0].button_style = ''
        test1_D.children[0].style = {}

        rightgrid[3,0].isDo = True
        rightgrid[3,0].isRight = False
        rightgrid[3,0].color = '#004080'
        
    test1_A.children[0].on_click(test1_A_click)

    def test1_B_click(b):  #错
        b.style = {'button_color':'#004080'}
        b.button_style = 'info'

        test1_A.children[0].button_style = ''
        test1_A.children[0].style = {}

        test1_C.children[0].button_style = ''
        test1_C.children[0].style = {}

        test1_D.children[0].button_style = ''
        test1_D.children[0].style = {}

        rightgrid[3,0].isDo = True
        rightgrid[3,0].isRight = False
        rightgrid[3,0].color = '#004080'
        
    test1_B.children[0].on_click(test1_B_click)

    def test1_C_click(b):  #错
        b.style = {'button_color':'#004080'}
        b.button_style = 'info'

        test1_B.children[0].button_style = ''
        test1_B.children[0].style = {}

        test1_A.children[0].button_style = ''
        test1_A.children[0].style = {}

        test1_D.children[0].button_style = ''
        test1_D.children[0].style = {}

        rightgrid[3,0].isDo = True
        rightgrid[3,0].isRight = False
        rightgrid[3,0].color = '#004080'
        
    test1_C.children[0].on_click(test1_C_click)

    def test1_D_click(b):  #对
        b.style = {'button_color':'#004080'}
        b.button_style = 'info'

        test1_A.children[0].button_style = ''
        test1_A.children[0].style = {}

        test1_C.children[0].button_style = ''
        test1_C.children[0].style = {}

        test1_B.children[0].button_style = ''
        test1_B.children[0].style = {}

        rightgrid[3,0].isDo = True
        rightgrid[3,0].isRight = True
        rightgrid[3,0].color = '#004080'
        
    test1_D.children[0].on_click(test1_D_click)

    def test2_A_click(b):   #错
        b.style = {'button_color':'#004080'}
        b.button_style = 'info'

        test2_D.children[0].button_style = ''
        test2_D.children[0].style = {}

        test2_C.children[0].button_style = ''
        test2_C.children[0].style = {}

        test2_B.children[0].button_style = ''
        test2_B.children[0].style = {}

        rightgrid[3,1].isDo = True
        rightgrid[3,1].isRight = False
        rightgrid[3,1].color = '#004080'
        
    test2_A.children[0].on_click(test2_A_click)

    def test2_B_click(b):   #错
        b.style = {'button_color':'#004080'}
        b.button_style = 'info'

        test2_A.children[0].button_style = ''
        test2_A.children[0].style = {}

        test2_C.children[0].button_style = ''
        test2_C.children[0].style = {}

        test2_D.children[0].button_style = ''
        test2_D.children[0].style = {}

        rightgrid[3,1].isDo = True
        rightgrid[3,1].isRight = False
        rightgrid[3,1].color = '#004080'
        
    test2_B.children[0].on_click(test2_B_click)

    def test2_C_click(b):   #对
        b.style = {'button_color':'#004080'}
        b.button_style = 'info'

        test2_A.children[0].button_style = ''
        test2_A.children[0].style = {}

        test2_D.children[0].button_style = ''
        test2_D.children[0].style = {}

        test2_B.children[0].button_style = ''
        test2_B.children[0].style = {}

        rightgrid[3,1].isDo = True
        rightgrid[3,1].isRight = True
        rightgrid[3,1].color = '#004080'
        
    test2_C.children[0].on_click(test2_C_click)

    def test2_D_click(b):   #错
        b.style = {'button_color':'#004080'}
        b.button_style = 'info'

        test2_A.children[0].button_style = ''
        test2_A.children[0].style = {}

        test2_C.children[0].button_style = ''
        test2_C.children[0].style = {}

        test2_B.children[0].button_style = ''
        test2_B.children[0].style = {}

        rightgrid[3,1].isDo = True
        rightgrid[3,1].isRight = False
        rightgrid[3,1].color = '#004080'
        
    test2_D.children[0].on_click(test2_D_click)

    def test3_A_click(b):   #错
        b.style = {'button_color':'#004080'}
        b.button_style = 'info'

        test3_D.children[0].button_style = ''
        test3_D.children[0].style = {}

        test3_C.children[0].button_style = ''
        test3_C.children[0].style = {}

        test3_B.children[0].button_style = ''
        test3_B.children[0].style = {}

        rightgrid[3,2].isDo = True
        rightgrid[3,2].isRight = False
        rightgrid[3,2].color = '#004080'
        
    test3_A.children[0].on_click(test3_A_click)

    def test3_B_click(b):   #对
        b.style = {'button_color':'#004080'}
        b.button_style = 'info'

        test3_A.children[0].button_style = ''
        test3_A.children[0].style = {}

        test3_C.children[0].button_style = ''
        test3_C.children[0].style = {}

        test3_D.children[0].button_style = ''
        test3_D.children[0].style = {}

        rightgrid[3,2].isDo = True
        rightgrid[3,2].isRight = True
        rightgrid[3,2].color = '#004080'
        
    test3_B.children[0].on_click(test3_B_click)

    def test3_C_click(b):   #错
        b.style = {'button_color':'#004080'}
        b.button_style = 'info'

        test3_A.children[0].button_style = ''
        test3_A.children[0].style = {}

        test3_D.children[0].button_style = ''
        test3_D.children[0].style = {}

        test3_B.children[0].button_style = ''
        test3_B.children[0].style = {}

        rightgrid[3,2].isDo = True
        rightgrid[3,2].isRight = False
        rightgrid[3,2].color = '#004080'
        
    test3_C.children[0].on_click(test3_C_click)

    def test3_D_click(b):   #错
        b.style = {'button_color':'#004080'}
        b.button_style = 'info'

        test3_A.children[0].button_style = ''
        test3_A.children[0].style = {}

        test3_C.children[0].button_style = ''
        test3_C.children[0].style = {}

        test3_B.children[0].button_style = ''
        test3_B.children[0].style = {}

        rightgrid[3,2].isDo = True
        rightgrid[3,2].isRight = False
        rightgrid[3,2].color = '#004080'
        
    test3_D.children[0].on_click(test3_D_click)

    def test4_A_click(b):   #错
        b.style = {'button_color':'#004080'}
        b.button_style = 'info'

        test4_D.children[0].button_style = ''
        test4_D.children[0].style = {}

        test4_C.children[0].button_style = ''
        test4_C.children[0].style = {}

        test4_B.children[0].button_style = ''
        test4_B.children[0].style = {}

        rightgrid[3,3].isDo = True
        rightgrid[3,3].isRight = False
        rightgrid[3,3].color = '#004080'
        
    test4_A.children[0].on_click(test4_A_click)

    def test4_B_click(b):   #错
        b.style = {'button_color':'#004080'}
        b.button_style = 'info'

        test4_A.children[0].button_style = ''
        test4_A.children[0].style = {}

        test4_C.children[0].button_style = ''
        test4_C.children[0].style = {}

        test4_D.children[0].button_style = ''
        test4_D.children[0].style = {}

        rightgrid[3,3].isDo = True
        rightgrid[3,3].isRight = False
        rightgrid[3,3].color = '#004080'
        
    test4_B.children[0].on_click(test4_B_click)

    def test4_C_click(b):   #对
        b.style = {'button_color':'#004080'}
        b.button_style = 'info'

        test4_A.children[0].button_style = ''
        test4_A.children[0].style = {}

        test4_D.children[0].button_style = ''
        test4_D.children[0].style = {}

        test4_B.children[0].button_style = ''
        test4_B.children[0].style = {}
        
        rightgrid[3,3].isDo = True
        rightgrid[3,3].isRight = True
        rightgrid[3,3].color = '#004080'
        
    test4_C.children[0].on_click(test4_C_click)

    def test4_D_click(b):   #错
        b.style = {'button_color':'#004080'}
        b.button_style = 'info'

        test4_A.children[0].button_style = ''
        test4_A.children[0].style = {}

        test4_C.children[0].button_style = ''
        test4_C.children[0].style = {}

        test4_B.children[0].button_style = ''
        test4_B.children[0].style = {}

        rightgrid[3,3].isDo = True
        rightgrid[3,3].isRight = False
        rightgrid[3,3].color = '#004080'
        
    test4_D.children[0].on_click(test4_D_click)

    def test5_A_click(b):   #错
        b.style = {'button_color':'#004080'}
        b.button_style = 'info'

        test5_D.children[0].button_style = ''
        test5_D.children[0].style = {}

        test5_C.children[0].button_style = ''
        test5_C.children[0].style = {}

        test5_B.children[0].button_style = ''
        test5_B.children[0].style = {}
        
        rightgrid[3,4].isDo = True
        rightgrid[3,4].isRight = False
        rightgrid[3,4].color = '#004080'

    test5_A.children[0].on_click(test5_A_click)

    def test5_B_click(b):   #错
        b.style = {'button_color':'#004080'}
        b.button_style = 'info'

        test5_A.children[0].button_style = ''
        test5_A.children[0].style = {}

        test5_C.children[0].button_style = ''
        test5_C.children[0].style = {}

        test5_D.children[0].button_style = ''
        test5_D.children[0].style = {}

        rightgrid[3,4].isDo = True
        rightgrid[3,4].isRight = False
        rightgrid[3,4].color = '#004080'
        
    test5_B.children[0].on_click(test5_B_click)

    def test5_C_click(b):   #对
        b.style = {'button_color':'#004080'}
        b.button_style = 'info'

        test5_A.children[0].button_style = ''
        test5_A.children[0].style = {}

        test5_D.children[0].button_style = ''
        test5_D.children[0].style = {}

        test5_B.children[0].button_style = ''
        test5_B.children[0].style = {}

        rightgrid[3,4].isDo = True
        rightgrid[3,4].isRight = True
        rightgrid[3,4].color = '#004080'
        
    test5_C.children[0].on_click(test5_C_click)

    def test5_D_click(b):   #错
        b.style = {'button_color':'#004080'}
        b.button_style = 'info'

        test5_A.children[0].button_style = ''
        test5_A.children[0].style = {}

        test5_C.children[0].button_style = ''
        test5_C.children[0].style = {}

        test5_B.children[0].button_style = ''
        test5_B.children[0].style = {}

        rightgrid[3,4].isDo = True
        rightgrid[3,4].isRight = False
        rightgrid[3,4].color = '#004080'
        
    test5_D.children[0].on_click(test5_D_click)

    def test6_text_change(change):    
        if change['new'] != '':
            rightgrid[3,5].isDo = True
            rightgrid[3,5].color = '#004080'
        else:
            rightgrid[3,5].isDo = False
            rightgrid[3,5].color = '#F5F5F5'

        if change['new'] == '全相联映射':
            rightgrid[3,5].isRight = True
        else:
            rightgrid[3,5].isRight = False
    test6_text.observe(test6_text_change,names = 'value')

    def test7_text_change(change):
        if change['new'] != '':
            rightgrid[4,0].isDo = True
            rightgrid[4,0].color = '#004080'
        else:
            rightgrid[4,0].isDo = False
            rightgrid[4,0].color = '#F5F5F5'

        if change['new'] == '32' or change['new'] == '32块' or change['new'] == '32个':
            rightgrid[4,0].isRight = True
        else:
            rightgrid[4,0].isRight = False
    test7_text.observe(test7_text_change,names = 'value')

    def test8_text_change(change):    
        if change['new'] != '':
            rightgrid[4,1].isDo = True
            rightgrid[4,1].color = '#004080'
        else:
            rightgrid[4,1].isDo = False
            rightgrid[4,1].color = '#F5F5F5'

        if change['new'] == '11' or change['new'] == '11位':
            rightgrid[4,1].isRight = True
        else:
            rightgrid[4,1].isRight = False
    test8_text.observe(test8_text_change,names = 'value')

    def test9_text_change(change):    
        if change['new'] != '':
            rightgrid[4,2].isDo = True
            rightgrid[4,2].color = '#004080'
        else:
            rightgrid[4,2].isDo = False
            rightgrid[4,2].color = '#F5F5F5'

        if change['new'] == '5' or change['new'] == '5位':
            rightgrid[4,2].isRight = True
        else:
            rightgrid[4,2].isRight = False
    test9_text.observe(test9_text_change,names = 'value')

    def test10_text_change(change):    
        if change['new'] != '':
            rightgrid[4,3].isDo = True
            rightgrid[4,3].color = '#004080'
        else:
            rightgrid[4,3].isDo = False
            rightgrid[4,3].color = '#F5F5F5'

        if change['new'] == '20' or change['new'] == '20位':
            rightgrid[4,3].isRight = True
        else:
            rightgrid[4,3].isRight = False
    test10_text.observe(test10_text_change,names = 'value')

    

    return
