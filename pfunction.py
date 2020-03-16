'''
实现“过程演示”界面的一些具体功能
'''
import datetime
import time
import ipywidgets as widgets
from IPython.display import display, Javascript
from ipywidgets import DOMWidget, register
from traitlets import Unicode, Int, List
import cache

display(Javascript("require.config({paths: {d3: 'https://d3js.org/d3.v5.min'}});"))   
display(Javascript(filename="./js/datapath_widget.js"))

@register
class Datapath(DOMWidget):
    _view_name = Unicode('DatapathView').tag(sync=True)
    _view_module = Unicode('datapath_widget').tag(sync=True)
    _view_module_version = Unicode('0.1.0').tag(sync=True)

    # Attributes
    step = Int().tag(sync=True)                 #运行所有指令的步骤数  
    max_step = Int().tag(sync=True)             #最大步骤数          need modify(play)
    instruction = Unicode('Loading').tag(sync=True)    #当前指令
    inst_type = Unicode().tag(sync=True)      #当前指令的类型
    inst_index = Int().tag(sync=True)          #当前指令在inst_list中的下标
    allInst = List().tag(sync=True)             #所有指令             need modify
    allType = List().tag(sync=True)             #所有指令对应的类型   need modify          

#  左右部分建立联系
def left_right_link(grid,leftab,right):
    
    def leftab_on_index_change(change):
        if change['new'] == 0:
            grid[1:19,20:30] = right['code']
            grid[19,18:23].disabled = True
            grid[19,23:26].disabled = True
        elif change['new'] == 1:
            grid[1:19,20:30] = right['datapath']
            if grid[19,18:23].max != 0:
                grid[19,18:23].disabled = False
                grid[19,23:26].disabled = False
        elif change['new'] == 2:
            grid[1:19,20:30] = right['cache']
            grid[19,18:23].disabled = True
            grid[19,23:26].disabled = True

    leftab.observe(leftab_on_index_change, names='selected_index')

    return

#查看元素是否存在
def isIn(x,array):

    for a in array:
        if x == a:
            return True

    return False

#  检查代码，返回报错内容
def checkCode(code,reg):

    if code == '':
        return {'check':"请输入指令\n",'data':code}
    
    code_array = code.split("\n",-1)          #按行分割代码
    code_list = []
    type_list = []

    for c in code_array:              #c是每行代码内容
        c_temp = c.split(" ",-1)      #将每行代码分割
        if c_temp[0] == 'add':        #add rd rs1 rs2
            if len(c_temp) == 4:
                if isIn(c_temp[1],reg) and isIn(c_temp[2],reg) and isIn(c_temp[3],reg):
                    type_list.append('add')
                    code_list.append(c)
                    continue
            return {'check':"\"" + c + "\" 语法错误\n",'data':code}
        elif c_temp[0] == 'addi':     #addi rd rs imm
            if len(c_temp) == 4:
                if isIn(c_temp[1],reg) and isIn(c_temp[2],reg) and c_temp[3].isdigit():
                    type_list.append('addi')
                    code_list.append(c)
                    continue
            return {'check':"\"" + c + "\" 语法错误\n",'data':code}
        else:
            if c_temp[0] != '':
                return {'check':"\"" + c + "\" 目前仅支持add,addi指令\n",'data':code}
    
    
    return {'check':'','code_list':code_list,'type_list':type_list}

#  过程演示的主要函数
def main_function(grid,left_list,right):

    leftab = left_list[0]
    left = left_list[1]

    #----------------Code部分组件功能实现/数据通路的显示-------------#

    reg = ['ra','sp','gp','tp','t0','t1','t2',
           'fp','s0','a0','a1','a2','a3','a4','a5',
           'a6','a7','s1','s2','s3','s4','s5','s6',
           's7','s8','s9','s10','t3','t4','t5','t6']
    
    code_grid = left['code']
    code_right = right['code']

    datapath_right_grid = right['datapath'].children[0]
    
    #  1.清除按钮
    def code_Delete(b):
        code_grid[0:19,0:10].value = ''
    code_grid[19,2].on_click(code_Delete)

    #  2.运行按钮
    def code_Run(b):
        code_right.children[0].selected_index = 1
        code_right.children[0].children[1].disabled = False
        code_right.children[0].children[1].value += datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        code_right.children[0].children[1].value += '\n>>>'
        code = code_grid[0:19,0:10].value
        check = checkCode(code,reg)
        if check['check'] == '':         #代码语法正确，跳转到datapath界面
            code_right.children[0].children[1].value += '运行成功，正在加载数据通路...\n'
            time.sleep(1)
            #-----------展示数据通路---------#
            leftab.selected_index = 1
            grid[19,18:23].disabled = False
            grid[19,23:26].disabled = False
            left['datapath'].allInst = check['code_list']
            left['datapath'].allType = check['type_list']
            grid[19,18:23].max = 5 * len(left['datapath'].allInst) + 1
            #----------更新寄存器内容--------#
            def updateReg(x):
                if x % 5 == 0 and x != 0:
                    rd_value = ''
                    rd_index = 0
                    inst_index = int(x / 5) - 1
                    instruction = check['code_list'][inst_index]
                    op_num_list = instruction.split(" ",-1)
                    op = op_num_list[0]
                    if op == 'add':
                        rd = op_num_list[1]
                        rs1 = op_num_list[2]
                        rs2 = op_num_list[3]
                        rd_index = reg.index(rd) + 2
                        rs1_index = reg.index(rs1) + 2
                        rs2_index = reg.index(rs2) + 2
                        rs1_value = int(datapath_right_grid[rs1_index,2].description,16)
                        rs2_value = int(datapath_right_grid[rs2_index,2].description,16)
                        rd_value = hex(rs1_value + rs2_value)
                    elif op == 'addi':
                        rd = op_num_list[1]
                        rs = op_num_list[2]
                        imm = int(op_num_list[3])
                        rd_index = reg.index(rd) + 2
                        rs_index = reg.index(rs) + 2
                        rs_value = int(datapath_right_grid[rs_index,2].description,16)
                        rd_value = hex(rs_value + imm)
                    if len(rd_value) != 10 :
                        rd_value = '0x' + ((10 - len(rd_value)) * '0') + rd_value[2:]

                    for i in range(3):
                        datapath_right_grid[rd_index,i].disabled = False
                        datapath_right_grid[rd_index,i].button_style = 'danger'
                    datapath_right_grid[rd_index,2].description = rd_value
    
    
                else:
                    for i in range(2,33):
                        for j in range(3):
                            datapath_right_grid[i,j].button_style = ''
                            datapath_right_grid[i,j].disabled = True
                            
                return
            temp = widgets.interactive(updateReg,x = grid[19,18:23])
            
        else:
            code_right.children[0].children[1].value += check['check']
        code_right.children[0].children[1].disabled = True
        return
    code_grid[19,7].on_click(code_Run)

    # -------------------显示Cache部分，调用 cache.py里的函数-------------------#
    cache.process_Cache(left['cache'],right['cache'])
    
    return

    
