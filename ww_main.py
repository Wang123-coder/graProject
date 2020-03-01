'''
“ww_main.py”：作为整个项目的主程序入口，显示界面
'''
import ipywidgets as widgets
from IPython.display import display
import initial
import pages

main_out = widgets.Output(layout={'border': '1px solid black'})
init_grid = initial.initGrid(main_out)
display(main_out)


#--------------以下为测试内容，可以直接从指定界面进入---------------#

#pages.loginPage(main_out,init_grid)        #显示Login界面
#pages.contentsPage(main_out,init_grid)     #直接显示目录界面
#pages.knowledgePage(main_out,init_grid)    #直接显示知识梳理界面
pages.processPage(main_out,init_grid)      #直接显示过程演示界面
#pages.testPage(main_out,init_grid)         #直接显示巩固测试界面
