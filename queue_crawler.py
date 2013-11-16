#!/usr/bin/env pythhon2
# -*- coding: utf-8 -*-

'''
  use       : used for learn， just for freshman of unique alg
  author    : atupal
  date      : 16/11/2013
'''

from login_weibo_rsa import Weibo
from  Queue import Queue

import unittest
import threading


# used for global session 
s = None
# production queue
q = None
# all photo ids
ids = None

# the photo's start url of 语希范's weibo
start_url = 'http://photo.weibo.com/2432143202/talbum/detail/photo_id/3644985982455839'

base_url = 'http://photo.weibo.com/2432143202/talbum/detail/photo_id/'

import re

def init():
  weibo = Weibo(debug=True)
  global s,q
  s = weibo.session
  q = Queue()
  content = s.get(start_url).content
  t = re.findall(r'album_photo_ids:.{1,9}(\[[0-9, ]+\]),', content, re.DOTALL)
  if len(t) == 0:
    print 'can not get the ids!'
    raise Exception
  exec( '_ids=%s' % t[0].strip().strip('\n') )
  assert( len(_ids) > 0 )
  global ids
  ids = _ids
  

def get_url(id):
  url = base_url + str(id)
  content = s.get(url).content
  t = re.findall(r'photo_info:.{1,9}([{].+[}])[ }]{1,9};.{1,9}var ids', content, re.DOTALL)
  assert( len(t) > 0 )
  exec('photoInfo=%s' % t[0].strip().strip('\n').replace('false', 'False'))

  t = re.findall(r'''\('[<]img id="bigImg" src="'\+(.+)\+'"[>]'\);''', content, re.DOTALL)
  assert( len(t) > 0 )
  exec( 'purl=%s' % t[0] )
  return purl.replace('\\', '')


'''嗯哼，没想到weibo 的图片这么容易爬，就先不用 这种暴力的方法了，下次有机会再演示吧
class Producer(threading.Thread):
  def __init__(self, url):
    self.s = Weibo()

  def run():
    try:
      url = q.get()
      content = self.s.get(url)
    except:
      pass
'''

def main():
  init()
  for id in ids:
    try:
      print get_url(id)
    except:
      pass


if __name__ == '__main__':
  import sys
  if len(sys.argv) > 1 and sys.argv[1] == 'test':
    unittest.main()
  else:
    sys.exit(main())
