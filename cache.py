'''
包含有关cache内容的函数：
    “知识梳理”界面中cache部分的“基础操作”
    “过程演示”界面中的cache部分
'''

from ipywidgets import DOMWidget, register
import ipywidgets as widgets
from traitlets import Int, Unicode
from IPython.display import display, Javascript
import math
import time

@register
class CacheBaseOp(DOMWidget):
    _view_name = Unicode('CacheBaseOpView').tag(sync=True)
    _view_module = Unicode('cache_baseop').tag(sync=True)
    _view_module_version = Unicode('0.1.0').tag(sync=True)

    # Attributes
    step = Int().tag(sync=True)                   
    max_step = Int().tag(sync=True)             #最大步骤数          need modify(play)

@register
class CacheMapWay(DOMWidget):
    _view_name = Unicode('CacheMapWayView').tag(sync=True)
    _view_module = Unicode('cache_mapway').tag(sync=True)
    _view_module_version = Unicode('0.1.0').tag(sync=True)

    # Attributes
    step = Int().tag(sync=True)                   
    max_step = Int().tag(sync=True)             #最大步骤数          need modify(play)
    map_way = Unicode().tag(sync=True)          #映射方式

@register  #数据访问
class CacheDataAcess(DOMWidget):
    _view_name = Unicode('CacheDataAcessView').tag(sync=True)
    _view_module = Unicode('cache_acess').tag(sync=True)
    _view_module_version = Unicode('0.1.0').tag(sync=True)

    # Attributes
    step = Int().tag(sync=True)                   
    max_step = Int().tag(sync=True)             #最大步骤数          need modify(play)
    map_way = Unicode().tag(sync=True)          #映射方式
    cache_RowCount = Unicode().tag(sync=True)   #Cache行数
    memory_BlockCount = Unicode().tag(sync=True)    #主存块数
    block_digits = Unicode().tag(sync=True)         #块内地址位数
    direct_tag_digits = Unicode().tag(sync=True)           #Tag位数
    group_tag_digits = Unicode().tag(sync=True)           #Tag位数
    full_tag_digits = Unicode().tag(sync=True)           #Tag位数
    address = Unicode().tag(sync=True)        #地址

    #  直接映射特有
    cache_BlockNumDigits = Unicode().tag(sync=True)   #cache 行号位数

    #  组相联映射特有
    cache_GroupNumDigits = Unicode().tag(sync=True)   #cache 组号位数
    cache_GroupNum = Unicode().tag(sync=True)         #cache 组数

@register  #替换算法
class CacheReplacement(DOMWidget):
    _view_name = Unicode('CacheReplacementView').tag(sync=True)
    _view_module = Unicode('cache_replacement').tag(sync=True)
    _view_module_version = Unicode('0.1.0').tag(sync=True)

    # Attributes
    step = Int().tag(sync=True)                   
    max_step = Int().tag(sync=True)             #最大步骤数          need modify(play)
    replace_way = Unicode().tag(sync=True)      #替换算法
    group_capacity_index = Int().tag(sync=True)   #对应组容量_下标号


#  显示“知识梳理”中的“基础操作”
def knowledge_base(baseGrid):

    display(Javascript("require.config({paths: {d3: 'https://d3js.org/d3.v5.min'}});"))
    display(Javascript(filename="./js/cache_baseop.js"))
    display(Javascript(filename="./js/cache_replacement.js"))
    
    baseGrid[0:9,:] = CacheBaseOp()
    baseGrid[9,1] = widgets.Play(interval=1000,
                         value=0,
                         min=0,
                         max=11,
                         step=1)
    widgets.link((baseGrid[9,1], 'value'), (baseGrid[0:9,:], 'step'))
    widgets.link((baseGrid[9,1], 'max'), (baseGrid[0:9,:], 'max_step'))

    baseGrid[9,2] = widgets.SelectionSlider(options=['0.25px','0.5px','1px','2px','4px'],
                                             value = '1px',
                                             continuous_update=True,
                                             layout = widgets.Layout(width = '4cm'))

    def slider_play(change):
        if change['new'] == '0.25px':
            baseGrid[9,1].interval = 4000
        elif change['new'] == '0.5px':
            baseGrid[9,1].interval = 2000
        elif change['new'] == '1px':
            baseGrid[9,1].interval = 1000
        elif change['new'] == '2px':
            baseGrid[9,1].interval = 500
        elif change['new'] == '4px':
            baseGrid[9,1].interval = 250
    baseGrid[9,2].observe(slider_play,names = 'value')

    return

#  显示“知识梳理”中的“映射方式”
def knowledge_mapway(mapGrid):

    display(Javascript("require.config({paths: {d3: 'https://d3js.org/d3.v5.min'}});"))
    display(Javascript(filename="./js/cache_mapway.js"))
    
    mapGrid[:,1:] = CacheMapWay()
    mapGrid[0,0] = widgets.HBox([widgets.Label(value = '映射方式 ： '),
                                 widgets.Dropdown(options = ['','直接映射','全相联映射','组相联映射'],
                                                  value = '',
                                                  layout = widgets.Layout(width = '3cm'))])
    
    mapGrid[1:5,0] = widgets.Output(layout={'width':'5cm','height':'3.5cm','border': '1px solid darkgray'})
    with mapGrid[1:5,0]:
        display(widgets.Label(value = ''))

    mapGrid[5,0] = widgets.HBox([widgets.Label(layout = widgets.Layout(width = '0.2cm')),
                                 widgets.HBox([widgets.Label(value = '>>> 块传送单元 ：  '),widgets.Label(value = '512 B')])])

    mapGrid[6,0] = widgets.HBox([widgets.Label(layout = widgets.Layout(width = '0.2cm')),
                                 widgets.HBox([widgets.Label(value = '>>> Cache大小 ：  '),widgets.Label(value = '8 KB')])])
    
    mapGrid[7,0] = widgets.HBox([widgets.Label(layout = widgets.Layout(width = '0.2cm')),
                                 widgets.HBox([widgets.Label(value = '>>> 主存容量大小 ：  '),widgets.Label(value = '1 MB')])])
    
    mapGrid[8,0] = widgets.Play(interval=1000,value=0,min=0,max=9,step=1,layout = widgets.Layout(width = '5cm'))
    mapGrid[9,0] = widgets.SelectionSlider(options=['0.25px','0.5px','1px','2px','4px'],value = '1px',
                                           continuous_update=True,layout = widgets.Layout(width = '5.5cm'))
    
    widgets.link((mapGrid[8,0], 'value'), (mapGrid[:,1:], 'step'))
    widgets.link((mapGrid[8,0], 'max'), (mapGrid[:,1:], 'max_step'))
    widgets.link((mapGrid[0,0].children[1], 'value'), (mapGrid[:,1:], 'map_way'))

    #  显示映射方式的定义
    def update_show(change):
        mapGrid[1:5,0].clear_output()
        mapGrid[8,0]._playing = False
        mapGrid[8,0].value = 0
        with mapGrid[1:5,0]:
            if change['new'] == '直接映射':
                v1 = widgets.VBox([widgets.Label(value = '主存的每一块映射到一个固',layout = widgets.Layout(height = '0.5cm')),
                                   widgets.Label(value = '定的Cache行中,也称为模映',layout = widgets.Layout(height = '0.5cm'))])
                v2 = widgets.VBox([widgets.Label(value = '射。Cache行号 = 主存块号',layout = widgets.Layout(height = '0.5cm')),
                                   widgets.Label(value = 'mod Cache行数',layout = widgets.Layout(height = '0.5cm'))])
                display(widgets.VBox([v1,v2]))
                mapGrid[8,0].max = 9
                mapGrid[:,1:].map_way = '直接映射'
            elif change['new'] == '全相联映射':
                display(widgets.Label(value = '主存块可装到Cache任一行中',layout = widgets.Layout(height = '0.5cm')))
                mapGrid[8,0].max = 6
                mapGrid[:,1:].map_way = '全相联映射'
            elif change['new'] == '组相联映射':
                v3 = widgets.VBox([widgets.Label(value = '将Cache所有行分组，把主',layout = widgets.Layout(height = '0.5cm')),
                                   widgets.Label(value = '存块映射到Cache固定组的',layout = widgets.Layout(height = '0.5cm'))])
                v4 = widgets.VBox([widgets.Label(value = '任一行中（组间模映射、',layout = widgets.Layout(height = '0.5cm')),
                                   widgets.Label(value = '组内全映射）。Cache组号',layout = widgets.Layout(height = '0.5cm'))])
                v5 = widgets.VBox([v3,v4])
                display(widgets.VBox([v5,widgets.Label(value = '= 主存块号 mod Cache组数',layout = widgets.Layout(height = '0.5cm'))]))
                mapGrid[8,0].max = 10
                mapGrid[:,1:].map_way = '组相联映射'
    mapGrid[0,0].children[1].observe(update_show,names = 'value')
    

    # 修改倍速
    def slider_play(change):
        if change['new'] == '0.25px':
            mapGrid[8,0].interval = 4000
        elif change['new'] == '0.5px':
            mapGrid[8,0].interval = 2000
        elif change['new'] == '1px':
            mapGrid[8,0].interval = 1000
        elif change['new'] == '2px':
            mapGrid[8,0].interval = 500
        elif change['new'] == '4px':
            mapGrid[8,0].interval = 250
    mapGrid[9,0].observe(slider_play,names = 'value')

    return

#  “过程演示”：Cache界面
#   参数：
#     left_accordion.children = grid; children[0]、children[1]
#     right_tab.children[0] = grid
def process_Cache(left_accordion,right_tab):
    
    display(Javascript("require.config({paths: {d3: 'https://d3js.org/d3.v5.min'}});"))
    display(Javascript(filename="./js/cache_acess.js"))

    # --------------------------  右侧  -----------------------------#
    temp_label = widgets.Label()
    
    right_tab.children[0][0,:] = widgets.HBox([widgets.Label(value = '映射方式',layout = widgets.Layout(width = 'auto',height = 'auto')),
                                               widgets.Dropdown(options = ['','直接映射','全相联映射','组相联映射'],
                                                                value = '',
                                                                layout = widgets.Layout(width = '4cm',height = 'auto'))],
                                              layout = widgets.Layout(justify_content = 'space-between'))
    #  块容量
    blockUnit_slider = widgets.SelectionSlider(options = ['128B','256B','512B'],value = '256B',
                                                continuous_update = True,readout = False,
                                                layout = widgets.Layout(width = '3cm',height = 'auto'))
    blockUnit_label = widgets.Label(layout = widgets.Layout(width = '1cm',height = 'auto'))
    widgets.link((blockUnit_slider, 'value'), (blockUnit_label, 'value'))
    right_tab.children[0][1,:] = widgets.HBox([widgets.Label(value = '块容量',layout = widgets.Layout(width = 'auto',height = 'auto')),
                                               widgets.HBox([blockUnit_slider,blockUnit_label])],
                                              layout = widgets.Layout(justify_content = 'space-between'))
    #  块内地址位数 = log2（块容量）
    blockDigits_button  = widgets.Button(description = '8',
                                          tooltip = 'log2(块容量)')
    right_tab.children[0][2,:] = widgets.HBox([widgets.Label(value = '块内地址位数',layout = widgets.Layout(width = 'auto',height = 'auto')),blockDigits_button],
                                              layout = widgets.Layout(justify_content = 'space-between'))

    #  Cache容量
    cache_slider = widgets.SelectionSlider(options = ['4KB','8KB','16KB'],value = '8KB',
                                                continuous_update = True,readout = False,
                                                layout = widgets.Layout(width = '3cm',height = 'auto'))
    cache_label = widgets.Label(layout = widgets.Layout(width = '1cm',height = 'auto'))
    widgets.link((cache_slider, 'value'), (cache_label, 'value'))
    right_tab.children[0][3,:] = widgets.HBox([widgets.Label(value = 'Cache容量',layout = widgets.Layout(width = 'auto',height = 'auto')),
                                               widgets.HBox([cache_slider,cache_label])],
                                              layout = widgets.Layout(justify_content = 'space-between'))

    #  主存容量
    memory_slider = widgets.SelectionSlider(options = ['256KB','512KB','1MB'],value = '512KB',
                                                continuous_update = True,readout = False,
                                                layout = widgets.Layout(width = '2.8cm',height = 'auto'))
    memory_label = widgets.Label(layout = widgets.Layout(width = '1.2cm',height = 'auto'))
    widgets.link((memory_slider, 'value'), (memory_label, 'value'))
    right_tab.children[0][4,:] = widgets.HBox([widgets.Label(value = '主存容量',layout = widgets.Layout(width = 'auto',height = 'auto')),
                                               widgets.HBox([memory_slider,memory_label])],
                                              layout = widgets.Layout(justify_content = 'space-between'))

    # 主存地址位数  = log2(主存容量)
    memoryDigits_button =  widgets.Button(description = '19',
                                          tooltip = 'log2(主存容量)')
    right_tab.children[0][5,:] = widgets.HBox([widgets.Label(value = '主存地址位数',layout = widgets.Layout(width = 'auto',height = 'auto')),memoryDigits_button],
                                              layout = widgets.Layout(justify_content = 'space-between'))

    #  主存块数 = 主存容量 / 块传送单位
    memoryRows_button = widgets.Button(description = '2048',
                                       tooltip = '主存块数 = 主存容量 / 块容量')
    right_tab.children[0][6,:] = widgets.HBox([widgets.Label(value = '主存块数',layout = widgets.Layout(width = 'auto',height = 'auto')),memoryRows_button],
                                              layout = widgets.Layout(justify_content = 'space-between'))

    #  Cache行数 = Cache容量 / 块传送单位
    cacheRows_button = widgets.Button(description = '32',
                                      tooltip = 'Cache行数 = Cache容量 / 块容量')
    right_tab.children[0][7,:] = widgets.HBox([widgets.Label(value = 'Cache行数',layout = widgets.Layout(width = 'auto',height = 'auto')),cacheRows_button],
                                              layout = widgets.Layout(justify_content = 'space-between'))

    #--------------------  直接映射特有  -------------------------#
    #  Cache行号位数 = log2(Cache行数)
    cacheDigits_button  = widgets.Button(description = '5',
                                          tooltip = 'log2(Cache行数)')

    # 主存块群数 = 主存块数 / Cache行数
    memoryGroups_button =  widgets.Button(description = '64',
                                       tooltip = '主存块群数 = 主存块数 / Cache行数')

    # 主存Tag位数 = log2(主存块群数)
    memoryTagDigits_button = widgets.Button(description = '6',
                                          tooltip = 'log2(主存块群数)')

    #  Cache行号 = 主存块号 % Cache行数
    cacheNum_button = widgets.Button(description = '0',tooltip = 'Cache行号 = 主存块号 % Cache行数')

    #------------------------ 全相联映射特有 ------------------------#
     # 主存Tag位数 = log2(主存块数)
    full_TagDigits_button = widgets.Button(description = '11',
                                          tooltip = 'log2(主存块数)')
    
    #----------------------- 组相联映射特有 ------------------------#
    #  Cache组容量
    cacheGroupCapacity_slider = widgets.SelectionSlider(options = ['2行/组','4行/组','8行/组'],value = '4行/组',
                                                continuous_update = True,readout = False,
                                                layout = widgets.Layout(width = '3cm',height = 'auto'))
    cacheGroupCapacity_label = widgets.Label(layout = widgets.Layout(width = '1cm',height = 'auto'))
    widgets.link((cacheGroupCapacity_slider, 'value'), (cacheGroupCapacity_label, 'value'))
    
    #  Cache组数  = Cache行数 / 组容量
    cacheGroupNum_button = widgets.Button(description = '8',
                                          tooltip = 'Cache组数  = Cache行数 / 组容量')
    #  Cache组号 = 主存块号 % Cache组数
    cacheGroupCount_button = widgets.Button(description = '0',tooltip = 'Cache组号 = 主存块号 % Cache组数')

    #  Cache组号位数 = log2（Cache组数）
    cacheGroupDigit_button = widgets.Button(description = '3',
                                          tooltip = 'Cache组号位数 = log2（Cache组数）')
    
    #  主存组容量 = Cache组数
    memoryGroupCapacity = widgets.Button(description = '8',layout = widgets.Layout(width = '3.5cm',height = 'auto'),
                                          tooltip = '主存组容量 = Cache组数')
    widgets.link((cacheGroupNum_button, 'description'), (memoryGroupCapacity, 'description'))

    #  主存组群数（组数） = 主存块数 / 主存组容量（块/组）
    memoryGroupNum = widgets.Button(description = '256',layout = widgets.Layout(width = '3.5cm',height = 'auto'),
                                          tooltip = '主存组群数（组数） = 主存块数 / 主存组容量（块/组）')

    #  主存Tag位数 = log2(主存组群数)
    group_TagDigits = widgets.Button(description = '8',layout = widgets.Layout(width = '3.5cm',height = 'auto'),
                                     tooltip = '主存Tag位数 = log2(主存组群数)')

    #  直接映射  、组映射共有
    # 主存块号:最大值随主存块数变化
    memoryNum_slider = widgets.IntSlider(min = 0,step = 1,max = 2047,
                                      continuous_update = True,readout = False,
                                      layout = widgets.Layout(width = '3cm',height = 'auto'))
    memoryNum_label = widgets.Label(value = '0',layout = widgets.Layout(width = '1cm',height = 'auto'))
    
    #  ---------------------  替换算法  --------------------------- #
    #  替换算法
    replace_slider = widgets.Dropdown(options = ['','先进先出(FIFO)','最近最少使用(LRU)'],value = '',
                                                continuous_update = True,readout = False,
                                                layout = widgets.Layout(width = '4cm',height = 'auto'))
    #  组容量
    capacity_slider = widgets.SelectionSlider(options = ['3行/组','4行/组'],value = '3行/组',
                                                continuous_update = True,readout = False,
                                                layout = widgets.Layout(width = '3cm',height = 'auto'))
    capacity_label = widgets.Label(layout = widgets.Layout(width = '1cm',height = 'auto'))
    widgets.link((capacity_slider, 'value'), (capacity_label, 'value'))

    right_tab.children[0][8,:] = widgets.HBox([widgets.Label(value = '替换算法',layout = widgets.Layout(width = 'auto',height = 'auto')),replace_slider],
                                              layout = widgets.Layout(justify_content = 'space-between'))
    right_tab.children[0][9,:] = widgets.HBox([widgets.Label(value = '组容量',layout = widgets.Layout(width = 'auto',height = 'auto')),
                                                        widgets.HBox([capacity_slider,capacity_label])],
                                                        layout = widgets.Layout(justify_content = 'space-between'))

    # --------------------------  左侧  -----------------------------#
    cache_dataAcess = CacheDataAcess()          #数据访问
    left_accordion.children[0][:9,:] = cache_dataAcess
    left_accordion.children[0][9,0] = widgets.Text(value = '>>>输入地址如：022cH',disabled = True,layout = widgets.Layout(width = '4cm'))
    left_accordion.children[0][9,1] = widgets.Button(description = '访问',disabled = True,tooltip = '最大地址值：7ffff',layout = widgets.Layout(width = '2cm'))
    left_accordion.children[0][9,2] = widgets.Play(interval=1000,value=0,min=0,max=5,step=1,disabled = True,layout = widgets.Layout(height = '0.75cm'))
    left_accordion.children[0][9,3] = widgets.SelectionSlider(options=['0.25px','0.5px','1px','2px','4px'],value = '1px',disabled = True,continuous_update=True,layout = widgets.Layout(width = '4.5cm'))
    
    widgets.link((left_accordion.children[0][9,2], 'value'), (left_accordion.children[0][:9,:], 'step'))
    widgets.link((left_accordion.children[0][9,2], 'max'), (left_accordion.children[0][:9,:], 'max_step'))
    widgets.link((cacheRows_button,'description'),(left_accordion.children[0][:9,:], 'cache_RowCount'))        #cache行数
    widgets.link((memoryRows_button,'description'),(left_accordion.children[0][:9,:],'memory_BlockCount'))       #主存块数
    widgets.link((blockDigits_button,'description'),(left_accordion.children[0][:9,:],'block_digits'))      #块内地址位数
    widgets.link((cacheDigits_button,'description'),(left_accordion.children[0][:9,:],'cache_BlockNumDigits'))     #Cache行号位数 【直接映射】
    widgets.link((cacheGroupDigit_button,'description'),(left_accordion.children[0][:9,:],'cache_GroupNumDigits'))     #cache组号位数 【组相联映射】
    widgets.link((cacheGroupNum_button,'description'),(left_accordion.children[0][:9,:],'cache_GroupNum'))           #cache组数  【组相联映射】
    widgets.link((memoryTagDigits_button,'description'),(left_accordion.children[0][:9,:],'direct_tag_digits'))
    widgets.link((full_TagDigits_button,'description'),(left_accordion.children[0][:9,:],'full_tag_digits'))
    widgets.link((group_TagDigits,'description'),(left_accordion.children[0][:9,:],'group_tag_digits'))

    display(Javascript(filename="./js/cache_replacement.js"))
    cache_replace = CacheReplacement()         #替换算法
    left_accordion.children[1][:9,:] = cache_replace
    left_accordion.children[1][9,1] = widgets.Play(interval=1000,value=0,min=0,max=12,disabled=True,step=1,layout = widgets.Layout(height = '0.75cm'))
    left_accordion.children[1][9,2] = widgets.SelectionSlider(options=['0.25px','0.5px','1px','2px','4px'],disabled=True,value = '1px',continuous_update=True,layout = widgets.Layout(width = '4.5cm'))
    
    widgets.link((left_accordion.children[1][9,1], 'value'), (left_accordion.children[1][:9,:], 'step'))
    widgets.link((left_accordion.children[1][9,1], 'max'), (left_accordion.children[1][:9,:], 'max_step'))
    widgets.link((replace_slider, 'value'), (cache_replace, 'replace_way'))
    widgets.link((capacity_slider, 'index'), (cache_replace, 'group_capacity_index'))
    
    #------------------------------------------  替换算法  -------------------------------------#
    #改变组容量  更新
    def update_capacity_slider(change):
        left_accordion.children[1][9,1]._playing = False
        left_accordion.children[1][9,1].value = 0
    capacity_slider.observe(update_capacity_slider,names = 'value')
                             
    #  修改倍速(替换算法)
    def slider_play1(change):
        if change['new'] == '0.25px':
            left_accordion.children[1][9,1].interval = 4000
        elif change['new'] == '0.5px':
            left_accordion.children[1][9,1].interval = 2000
        elif change['new'] == '1px':
            left_accordion.children[1][9,1].interval = 1000
        elif change['new'] == '2px':
            left_accordion.children[1][9,1].interval = 500
        elif change['new'] == '4px':
            left_accordion.children[1][9,1].interval = 250
    left_accordion.children[1][9,2].observe(slider_play1,names = 'value')

    #  显示替换算法界面
    def replace_change(change):
        left_accordion.selected_index = 1
        left_accordion.children[1][9,1]._playing = False
        left_accordion.children[1][9,1].value = 0
        if(change['new'] == ''):
            left_accordion.children[1][9,1].disabled = True
            left_accordion.children[1][9,2].disabled = True
        else:
            left_accordion.children[1][9,1].disabled = False
            left_accordion.children[1][9,2].disabled = False
    replace_slider.observe(replace_change, names='value')
    
    #------------------------------------------  数据访问 ---------------------------------------#
    #  按钮“访问”事件
    def access_button_clicked(b):
        address_str = left_accordion.children[0][9,0].value.lower()
        max_16num = b.tooltip[6:]
        max_digit = 0
        
        if(max_16num == 'fffff'):
            max_digit = 20
        elif(max_16num == '7ffff'):
            max_digit = 19
        elif(max_16num == '3ffff'):
            max_digit = 18

        if(address_str == ''):
            left_accordion.children[0][9,0].value = '>>>请输入地址'
            b.button_style = 'warning'
            b.icon = 'warning'
            return
        
        if(address_str[len(address_str)-1] == 'h'):
            address_str = address_str[:len(address_str) - 1]

        try:
            if(int(address_str,16) > int(max_16num,16)):
                left_accordion.children[0][9,0].value = '>>>超过主存容量'
                b.button_style = 'warning'
                b.icon = 'warning'
                return
            else:
                left_accordion.children[0][9,2].disabled = False
                left_accordion.children[0][9,3].disabled = False
                
                temp = bin(int(address_str,16))[2:]
                zero = ''

                for i in range(max_digit - len(temp)):
                    zero += '0'
            
                cache_dataAcess.address = zero + temp
                b.button_style = 'success'
                b.icon = 'check'
                time.sleep(2)
                b.button_style = ''
                b.icon = ''
        except ValueError:
            left_accordion.children[0][9,0].value = '>>>格式错误'
            b.button_style = 'warning'
            b.icon = 'warning'
            return
        
    left_accordion.children[0][9,1].on_click(access_button_clicked)
    
    #  修改倍速(数据访问)
    def slider_play(change):
        if change['new'] == '0.25px':
            left_accordion.children[0][9,2].interval = 4000
        elif change['new'] == '0.5px':
            left_accordion.children[0][9,2].interval = 2000
        elif change['new'] == '1px':
            left_accordion.children[0][9,2].interval = 1000
        elif change['new'] == '2px':
            left_accordion.children[0][9,2].interval = 500
        elif change['new'] == '4px':
            left_accordion.children[0][9,2].interval = 250
    left_accordion.children[0][9,3].observe(slider_play,names = 'value')
    
    
    #  计算、显示Cache行数(从而计算出Cache行号)/主存块数
    def blockUnit_slider_change(change):
        cacheRows_button.description = str(int(math.pow(2,cache_slider.index - change['new'] + 5)))
        cacheGroupNum_button.description = str(int(int(cacheRows_button.description) / int(math.pow(2,cacheGroupCapacity_slider.index + 1))))          #Cache组数  = Cache行数 / 组容量
        cacheGroupDigit_button.description = str(int(math.log(int(cacheGroupNum_button.description),2)))              #Cache组数位数
        cacheDigits_button.description = str(cache_slider.index - change['new'] + 5)
        cacheNum_button.description = str(memoryNum_slider.value % int(cacheRows_button.description))
        memoryRows_button.description = str(int(math.pow(2,memory_slider.index - change['new'] + 11)))        # 主存块数
        memoryGroupNum.description = str(int(int(memoryRows_button.description) / int(memoryGroupCapacity.description)))       #主存组群数（组数） = 主存块数 / 主存组容量（块/组）
        group_TagDigits.description = str(int(math.log(int(memoryGroupNum.description),2)))                                    #  主存Tag位数 = log2(主存组群数)
        memoryNum_slider.max = int(memoryRows_button.description) - 1
        memoryGroups_button.description =  str(int(int(memoryRows_button.description) / int(cacheRows_button.description)))         #  主存块数 / Cache行数
        memoryTagDigits_button.description = str(int(math.log(int(memoryGroups_button.description),2)))
        blockDigits_button.description = str(change['new'] + 7)
        full_TagDigits_button.description = str(int(memoryDigits_button.description) - int(blockDigits_button.description))
        cacheGroupCount_button.description = str(memoryNum_slider.value % int(cacheGroupNum_button.description))      # Cache组号 = 主存块号 % Cache组数
    blockUnit_slider.observe(blockUnit_slider_change, names='index')
    
    def cache_slider_change(change):
        cacheRows_button.description = str(int(math.pow(2,change['new'] - blockUnit_slider.index + 5)))
        cacheGroupNum_button.description = str(int(int(cacheRows_button.description) / int(math.pow(2,cacheGroupCapacity_slider.index + 1))))          #Cache组数  = Cache行数 / 组容量
        cacheGroupDigit_button.description = str(int(math.log(int(cacheGroupNum_button.description),2)))              #Cache组数位数
        cacheDigits_button.description = str(change['new'] - blockUnit_slider.index + 5)
        cacheNum_button.description = str(memoryNum_slider.value % int(cacheRows_button.description))                           #Cache行号  
        memoryGroups_button.description =  str(int(int(memoryRows_button.description) / int(cacheRows_button.description)))         #  主存块群数 = 主存块数 / Cache行数
        memoryTagDigits_button.description = str(int(math.log(int(memoryGroups_button.description),2)))
        cacheGroupCount_button.description = str(memoryNum_slider.value % int(cacheGroupNum_button.description))      # Cache组号 = 主存块号 % Cache组数
        memoryGroupNum.description = str(int(int(memoryRows_button.description) / int(memoryGroupCapacity.description)))       #主存组群数（组数） = 主存块数 / 主存组容量（块/组）
        group_TagDigits.description = str(int(math.log(int(memoryGroupNum.description),2)))                                    #  主存Tag位数 = log2(主存组群数)
    cache_slider.observe(cache_slider_change, names='index')

    def memory_slider_change(change):
        memoryRows_button.description = str(int(math.pow(2,change['new'] - blockUnit_slider.index + 11)))        # 主存块数
        memoryGroupNum.description = str(int(int(memoryRows_button.description) / int(memoryGroupCapacity.description)))       #主存组群数（组数） = 主存块数 / 主存组容量（块/组）
        group_TagDigits.description = str(int(math.log(int(memoryGroupNum.description),2)))                                    #  主存Tag位数 = log2(主存组群数)
        memoryNum_slider.max = int(memoryRows_button.description) - 1
        memoryGroups_button.description =  str(int(int(memoryRows_button.description) / int(cacheRows_button.description)))          #  主存块数 / Cache行数
        memoryTagDigits_button.description = str(int(math.log(int(memoryGroups_button.description),2)))
        memoryDigits_button.description = str(change['new'] + 18)
        if memoryDigits_button.description == '20':
            left_accordion.children[0][9,1].tooltip = '最大地址值：fffff'
        elif memoryDigits_button.description == '19':
            left_accordion.children[0][9,1].tooltip = '最大地址值：7ffff'
        elif memoryDigits_button.description == '18':
            left_accordion.children[0][9,1].tooltip = '最大地址值：3ffff'
        full_TagDigits_button.description = str(int(memoryDigits_button.description) - int(blockDigits_button.description))
        cacheGroupCount_button.description = str(memoryNum_slider.value % int(cacheGroupNum_button.description))      # Cache组号 = 主存块号 % Cache组数
    memory_slider.observe(memory_slider_change, names='index')

    #  更改主存块号：用label显示值；计算Cache行号/组号；
    def memoryNum_slider_change(change):
        memoryNum_label.value = str(change['new'])
        cacheNum_button.description = str(change['new'] % int(cacheRows_button.description))
        cacheGroupCount_button.description = str(change['new'] % int(cacheGroupNum_button.description))      # Cache组号 = 主存块号 % Cache组数
    memoryNum_slider.observe(memoryNum_slider_change, names='value')

    #  更改Cache组容量
    def cacheGroupCapacity_slider_change(change):
        cacheGroupNum_button.description = str(int(int(cacheRows_button.description) / int(math.pow(2,change['new'] + 1))))          #Cache组数  = Cache行数 / 组容量
        cacheGroupDigit_button.description = str(int(math.log(int(cacheGroupNum_button.description),2)))              #Cache组数位数
        cacheGroupCount_button.description = str(memoryNum_slider.value % int(cacheGroupNum_button.description))      # Cache组号 = 主存块号 % Cache组数
        memoryGroupNum.description = str(int(int(memoryRows_button.description) / int(memoryGroupCapacity.description)))       #主存组群数（组数） = 主存块数 / 主存组容量（块/组）
        group_TagDigits.description = str(int(math.log(int(memoryGroupNum.description),2)))                                    #  主存Tag位数 = log2(主存组群数)
    cacheGroupCapacity_slider.observe(cacheGroupCapacity_slider_change, names='index')

    #  根据映射方式选择呈现内容
    def mapway_change_toshow(change):
        cache_dataAcess.map_way = change['new']
        if change['new'] == '直接映射':
            left_accordion.children[0][9,0].disabled = False
            left_accordion.children[0][9,1].disabled = False
            right_tab.children[0][8,:] = widgets.HBox([widgets.Label(value = 'Cache行号位数',layout = widgets.Layout(width = 'auto',height = 'auto')),cacheDigits_button],
                                              layout = widgets.Layout(justify_content = 'space-between'))
            right_tab.children[0][9,:] = widgets.HBox([widgets.Label(value = '主存块群数',layout = widgets.Layout(width = 'auto',height = 'auto')),memoryGroups_button],
                                              layout = widgets.Layout(justify_content = 'space-between'))
            right_tab.children[0][10,:] = widgets.HBox([widgets.Label(value = '主存Tag位数',layout = widgets.Layout(width = 'auto',height = 'auto')),memoryTagDigits_button],
                                              layout = widgets.Layout(justify_content = 'space-between'))
            right_tab.children[0][11,:] = widgets.HBox([widgets.Label(value = '主存块号',layout = widgets.Layout(width = 'auto',height = 'auto')),
                                               widgets.HBox([memoryNum_slider,memoryNum_label])],
                                              layout = widgets.Layout(justify_content = 'space-between'))
            right_tab.children[0][12,:] = widgets.HBox([widgets.Label(value = 'Cache行号',layout = widgets.Layout(width = 'auto',height = 'auto')),cacheNum_button],
                                              layout = widgets.Layout(justify_content = 'space-between'))
            right_tab.children[0][13,:] = widgets.HBox([widgets.Label(value = '替换算法',layout = widgets.Layout(width = 'auto',height = 'auto')),replace_slider],
                                              layout = widgets.Layout(justify_content = 'space-between'))
            right_tab.children[0][14,:] = widgets.HBox([widgets.Label(value = '组容量',layout = widgets.Layout(width = 'auto',height = 'auto')),
                                                        widgets.HBox([capacity_slider,capacity_label])],
                                                        layout = widgets.Layout(justify_content = 'space-between'))
            for i in range(15,18):
                right_tab.children[0][i,:] = temp_label
        elif change['new'] == '全相联映射':
            left_accordion.children[0][9,0].disabled = False
            left_accordion.children[0][9,1].disabled = False
            right_tab.children[0][8,:] = widgets.HBox([widgets.Label(value = '主存Tag位数',layout = widgets.Layout(width = 'auto',height = 'auto')),full_TagDigits_button],
                                              layout = widgets.Layout(justify_content = 'space-between'))
            right_tab.children[0][9,:] = widgets.HBox([widgets.Label(value = '替换算法',layout = widgets.Layout(width = 'auto',height = 'auto')),replace_slider],
                                              layout = widgets.Layout(justify_content = 'space-between'))
            right_tab.children[0][10,:] = widgets.HBox([widgets.Label(value = '组容量',layout = widgets.Layout(width = 'auto',height = 'auto')),
                                                        widgets.HBox([capacity_slider,capacity_label])],
                                                        layout = widgets.Layout(justify_content = 'space-between'))
            for i in range(11,18):
                right_tab.children[0][i,:] = temp_label
        elif change['new'] == '组相联映射':
            left_accordion.children[0][9,0].disabled = False
            left_accordion.children[0][9,1].disabled = False
            right_tab.children[0][8,:] = widgets.HBox([widgets.Label(value = 'Cache组容量',layout = widgets.Layout(width = 'auto',height = 'auto')),
                                               widgets.HBox([cacheGroupCapacity_slider,cacheGroupCapacity_label])],
                                              layout = widgets.Layout(justify_content = 'space-between'))
            right_tab.children[0][9,:] = widgets.HBox([widgets.Label(value = 'Cache组数',layout = widgets.Layout(width = 'auto',height = 'auto')),cacheGroupNum_button],
                                              layout = widgets.Layout(justify_content = 'space-between'))
            right_tab.children[0][10,:] = widgets.HBox([widgets.Label(value = 'Cache组号位数',layout = widgets.Layout(width = 'auto',height = 'auto')),cacheGroupDigit_button],
                                              layout = widgets.Layout(justify_content = 'space-between'))
            right_tab.children[0][11,:] = widgets.HBox([widgets.Label(value = '主存组容量(块/组)',layout = widgets.Layout(width = 'auto',height = 'auto')),memoryGroupCapacity],
                                              layout = widgets.Layout(justify_content = 'space-between'))
            right_tab.children[0][12,:] = widgets.HBox([widgets.Label(value = '主存组群数（组）',layout = widgets.Layout(width = 'auto',height = 'auto')),memoryGroupNum],
                                              layout = widgets.Layout(justify_content = 'space-between'))
            right_tab.children[0][13,:] = widgets.HBox([widgets.Label(value = '主存Tag位数',layout = widgets.Layout(width = 'auto',height = 'auto')),group_TagDigits],
                                              layout = widgets.Layout(justify_content = 'space-between'))
            right_tab.children[0][14,:] = widgets.HBox([widgets.Label(value = '主存块号',layout = widgets.Layout(width = 'auto',height = 'auto')),
                                               widgets.HBox([memoryNum_slider,memoryNum_label])],
                                              layout = widgets.Layout(justify_content = 'space-between'))
            right_tab.children[0][15,:] = widgets.HBox([widgets.Label(value = 'Cache组号',layout = widgets.Layout(width = 'auto',height = 'auto')),cacheGroupCount_button],
                                              layout = widgets.Layout(justify_content = 'space-between'))
            right_tab.children[0][16,:] = widgets.HBox([widgets.Label(value = '替换算法',layout = widgets.Layout(width = 'auto',height = 'auto')),replace_slider],
                                              layout = widgets.Layout(justify_content = 'space-between'))
            right_tab.children[0][17,:] = widgets.HBox([widgets.Label(value = '组容量',layout = widgets.Layout(width = 'auto',height = 'auto')),
                                                        widgets.HBox([capacity_slider,capacity_label])],
                                                        layout = widgets.Layout(justify_content = 'space-between'))
        elif change['new'] == '':
            left_accordion.children[0][9,0].disabled = True
            left_accordion.children[0][9,1].disabled = True
            left_accordion.children[0][9,2].disabled = True
            left_accordion.children[0][9,3].disabled = True
            right_tab.children[0][8,:] = widgets.HBox([widgets.Label(value = '替换算法',layout = widgets.Layout(width = 'auto',height = 'auto')),replace_slider],
                                              layout = widgets.Layout(justify_content = 'space-between'))
            right_tab.children[0][9,:] = widgets.HBox([widgets.Label(value = '组容量',layout = widgets.Layout(width = 'auto',height = 'auto')),
                                                        widgets.HBox([capacity_slider,capacity_label])],
                                                        layout = widgets.Layout(justify_content = 'space-between'))
            for i in range(10,18):
                right_tab.children[0][i,:] = temp_label

        #  显示数据访问界面
        left_accordion.selected_index = 0
        
    right_tab.children[0][0,:].children[1].observe(mapway_change_toshow, names='value')
    
    return
