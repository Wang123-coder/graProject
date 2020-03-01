user_list = {'20200000':'123456',
             '20200001':'123456'}

#检验用户名和密码是否正确,返回布尔值
def checkUser(n,p):
    
    for number in user_list.keys():
        if number == n:
            if user_list[number] == p:
                return True
            else:
                return False

    return False

