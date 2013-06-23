import re
import json
import urllib
#import urllib2
import base64
import hashlib
import requests
#import extract


WBCLIENT = 'ssologin.js(v.1.3.18)'
sha1 = lambda x: hashlib.sha1(x).hexdigest()


def wblogin(username, password):
    session = requests.session(
            #headers={
            #    'User-Agent': 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.1 (KHT'
            #    'ML, like Gecko) Chrome/21.0.1180.89 Safari/537.1'
            #    }
            )
    resp = session.get(
            'http://login.sina.com.cn/sso/prelogin.php?entry=weibo&callback=sina'
            'SSOController.preloginCallBack&su=%s&client=%s' %
            (base64.b64encode(username), WBCLIENT)
            )
    pre_login_str = re.findall(r'[^{]+({.+?})', resp.content)[0]
    pre_login_json = json.loads(pre_login_str)
    data = {
            'entry': 'weibo',
            'gateway': 1,
            'from': '',
            'savestate': 7,
            'useticket': 1,
            'ssosimplelogin': 1,
            'su': base64.b64encode(urllib.quote(username)),
            'service': 'miniblog',
            'servertime': pre_login_json['servertime'], 'nonce': pre_login_json['nonce'], 'pcid': pre_login_json['pcid'], 'vsnf': 1,
            'vsnval': '',
            'pwencode': 'wsse',
            'sp': sha1(sha1(sha1(password)) +
                str(pre_login_json['servertime']) +
                pre_login_json['nonce']),
            'encoding': 'UTF-8',
            'url': 'http://weibo.com/ajaxlogin.php?framelogin=1&callback=parent.si'
            'naSSOController.feedBackUrlCallBack',
            'returntype': 'META'
            }
    resp = session.post(
            'http://login.sina.com.cn/sso/login.php?client=%s' % WBCLIENT,
            data=data
            )
    login_url = re.search(r'replace\([\"\']([^\'\"]+)[\"\']',
            resp.content).group(1)
    resp = session.get(login_url)
    login_str = re.findall(r'[^{]+({.+?})', resp.content)[0]

    return json.loads(login_str)

if __name__ == '__main__':
    from pprint import pprint
    pprint(wblogin('atupal@foxmail.com', 'xxx'))
