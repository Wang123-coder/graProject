import ipywidgets as widgets
from IPython.display import display
'''
初始化grid内容
返回值： grid
'''
def initGrid(out):
    grid = widgets.GridspecLayout(20,30,width = 'auto',height='13.2cm')
    
    grid[0,0:29] = widgets.Button(disabled = False, 
                                  description = 'Welcome to learn ！',
                                  button_style ='info',
                                  tooltip = '标题',
                                  style = {'button_color':'#004080'},
                                  layout = widgets.Layout(width='auto',height='0.65cm'))
    grid[0,29] = widgets.Button(description = 'X',tooltip = '关闭',layout = widgets.Layout(width='0.8cm', height='0.65cm'))

    with out:
        display(grid)
    
    '''
    关闭整个程序：点击右上角×时执行
    '''
    def closeAll(b):
        out.clear_output()
        out.layout = {}
        with out:
            display(widgets.Label(value='Thank you for using ！'))
    grid[0,29].on_click(closeAll)
    
    return grid  
