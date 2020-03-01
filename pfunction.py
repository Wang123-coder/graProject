'''
实现“过程演示”界面的一些具体功能
'''
import ipywidgets as widgets
import datetime
import time
from IPython.display import display, Javascript, HTML
import json

display(Javascript("require.config({paths: {d3: 'https://d3js.org/d3.v5.min'}});"))
display(Javascript(filename="./js/datapath.js"))
display(HTML(filename="./html/datapath.css.html"))

#  画出数据通路
def draw_datapath(data,out):
    with out:
        display(Javascript("""
            (function(element){
                require(['datapath'], function(datapath) {
                    datapath(element.get(0), %s);
                });
            })(element);
        """ % (json.dumps(data))))
            

#  左右部分建立联系
def left_right_link(grid,leftab,right):
    
    def leftab_on_index_change(change):
        if change['new'] == 0:
            grid[1:19,20:30] = right['code']
        elif change['new'] == 1:
            grid[1:19,20:30] = right['datapath']
        elif change['new'] == 2:
            grid[1:19,20:30] = right['cache']

    leftab.observe(leftab_on_index_change, names='selected_index')

    return

#查看元素是否存在
def isIn(x,array):

    for a in array:
        if x == a:
            return True

    return False

#  检查代码，返回报错内容
def checkCode(code):

    reg = ['ra','sp','gp','tp','t0','t1','t2',
           'fp','s0','a0','a1','a2','a3','a4','a5',
           'a6','a7','s1','s2','s3','s4','s5','s6',
           's7','s8','s9','s10','t3','t4','t5','t6']

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
        elif c_temp[0] == 'beq':       #beq rs1 rs2 offset
            if len(c_temp) == 4:
                if isIn(c_temp[1],reg) and isIn(c_temp[2],reg) and c_temp[3].isdigit():
                    type_list.append('beq')
                    code_list.append(c)
                    continue
            return {'check':"\"" + c + "\" 语法错误\n",'data':code}
        else:
            if c_temp[0] != '':
                return {'check':"\"" + c + "\" 目前仅支持add,addi,beq指令\n",'data':code}
    
    
    return {'check':'','code_list':code_list,'type_list':type_list}
    
#  过程演示的主要函数
def main_function(grid,left_list,right):

    leftab = left_list[0]
    left = left_list[1]
    
    code_grid = left['code']
    code_right = right['code']

    #---------------------Code部分组件功能实现-------------#
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
        check = checkCode(code)
        code_list = check['code_list']
        type_list = check['type_list']
        if check['check'] == '':         #代码语法正确，跳转到datapath界面
            code_right.children[0].children[1].value += '运行成功，正在加载数据通路...\n'
            time.sleep(2)
            leftab.selected_index = 1
            for i in range(len(code_list)):
                left['datapath'].clear_output()
                draw_datapath([type_list[i],code_list[i]],left['datapath'])
                time.sleep(1)
        else:
            code_right.children[0].children[1].value += check['check']
        code_right.children[0].children[1].disabled = True
        return
    code_grid[19,7].on_click(code_Run)
    
    return

    
