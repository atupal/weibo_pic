# -*- coding=utf-8 -*-

'''
    use   : login weibo, and get the session
    author: atupal
'''


import unittest
import requests, requests.utils
import re
import json
import urllib
import base64
import rsa
import binascii
import pickle

class Weibo(object):
    def __init__(self, user = None, pwd = None, debug = False):
        if not user or pwd:
            with open('./user', 'r') as fi:
                self.user = fi.readline().strip('\n')
                self.pwd = fi.readline().strip('\n')
        else:
            self.user = user
            self.pwd = pwd
        self.session = requests.Session()
        self.debug = debug
        if self._read_cookie():
            self._login()

    def __del__(self):
        pass

    def _read_cookie(self):
        try:
            with open('./login.cookie', 'rb') as fi:
                cookie = pickle.load(fi)
                self.session.cookies.update(cookie)
                if self.session.get('http://weibo.com').content.find('登录') != -1:
                    return 1
                return 0
        except:
            return 1

    def _pre_login(self):
        '''
            获取服务器信息登录的时候一并post过去, 并利用这些信息对密码加密
        '''

        url = (
        'http://login.sina.com.cn/sso/prelogin.php?' +
        'entry=weibo' +
        '&callback=sinaSSOController.preloginCallBack' +
        '&su=%s' % self.user +
        '&rsakt=mod' + '&client=ssologin.js(v1.4.5)' + '&_=1372075156292'
        )

        resp = self.session.get(url)
        if self.debug:
            print resp.content

        self.server_data = re.findall(r'({.+?})', resp.content)[0]
        self.server_data = json.loads(self.server_data)

    def _encrypt_user(self):
        '''
            base64加密用户名
        '''
        return base64.encodestring(urllib.quote(self.user))

    def _encrypt_pwd(self):
        '''
            新浪微博登录加密密码的算法已经改成rsa的了
        '''
        rsa_publickey = int(self.server_data.get('pubkey'), 16)
        '''
           0x10001 是固定值, 化成10进制后为65537
        '''
        key = rsa.PublicKey(rsa_publickey, 65537)
        message = (str(self.server_data.get('servertime')) + '\t' + str(self.server_data.get('nonce')) +
                    '\n' + str(self.pwd))
        return binascii.b2a_hex(  rsa.encrypt(message, key)  )

    def _login(self):
        '''
            post登录
            需要验证码的还没弄
        '''
        self._pre_login()
        url = 'http://login.sina.com.cn/sso/login.php?client=ssologin.js(v1.4.5)'
        data = {
                'entry': 'weibo',
                'gateway': '1',
                'from': '',
                'savestate': '7',
                'userticket': '1',
                'ssosimplelogin': '1',
                'vsnf': '1',
                'vsnval': '',
                'su': '',
                'service': 'miniblog',
                'servertime': '',
                'nonce': '',
                'pwencode': 'rsa2',
                'sp': '',
                'encoding': 'UTF-8',
                'prelt': '115',
                'rsakv': '',
                'url': 'http://weibo.com/ajaxlogin.php?framelogin=1&callback=parent.sinaSSOController.feedBackUrlCallBack',
                'returntype': 'META'
                }

        data['servertime'] = self.server_data.get('servertime')
        data['nonce'] = self.server_data.get('nonce')
        data['rsakv'] = self.server_data.get('rsakv')
        data['su'] = self._encrypt_user()
        data['sp'] = self._encrypt_pwd()
        headers = {
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1535.3 Safari/537.36',
                }
        resp = self.session.post(url, data = data, headers = headers)

        '''
            post成功后的跳转url,再get一次取得一些cookie就算登录成功了
        '''
        url = re.findall('location.replace\("(.+?)"\)', resp.content)[0]
        resp = self.session.get(url)

        if self.debug:
            print resp.content

        #至此已经登录成功,拿着sssion可以做一切事了

        '''
            保存cookie,下次直接使用cookie
        '''
        with open('./login.cookie', 'wb') as fi:
            cookie = requests.utils.dict_from_cookiejar(self.session.cookies)
            pickle.dump(cookie, fi)

class _WeiboTestCase(unittest.TestCase):
    def setUp(self):
        self.client = Weibo(debug = True)

    def tearDown(self):
        pass

    def _test_prelogin(self):
        self.client._pre_login()

    def _test_encrypt_user(self):
        self.client._encrypt_user()
        print self.client.user

    def _test_login(self):
        self.client._login()

    def test_main(self):
        pass

if __name__ == "__main__":
    unittest.main()
