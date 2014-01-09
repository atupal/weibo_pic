
import lxml.html
from pprint import pprint as printf

class User(object):

    def __init__(self, weibo):
        self.weibo = weibo

    def __del__(self):
        pass

    def get_follow(self):
        url = 'http://weibo.com/2625685811/myfollow'
        resp = self.weibo.session.get(url)
        if self.weibo.debug:
            print resp.content

    def _parse(self, url = None, xpath = "//*", content = None):
        if not content and url:
            content = self.weibo.session.get(url).content
        try:
            doc = lxml.html.fromstring(content)
            return doc.xpath(xpath)
        except Exception as e:
            if self.weibo.debug:
                print e


    def get_pic_from_content(self, content):
        res = self._parse(xpath = '//a/@href',content = content)
        #con = lambda x: x.find('detail') != -1
        #res = filter(con, res)
        printf(res)

    def get_pic_from_url(self, url = None):
        if not url:url = 'http://photo.weibo.com/2061284281/albums'
        content = self.weibo.session.get(url).content
        self.get_pic_from_content(content)



import unittest

class _UserTest(unittest.TestCase):
    def setUp(self):
        from login_weibo_rsa import Weibo
        self.client = User(Weibo(debug = True))
        pass

    def tearDown(self):
        pass

    def _test_get_follow(self):
        self.client.get_follow()

    def test_get_pic_from_url(self):
        self.client.get_pic_from_url()

if __name__ == "__main__":
    unittest.main()


