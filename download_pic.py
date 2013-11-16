#!/usr/bin/env pythhon2
# -*- coding: utf-8 -*-

'''
  use       : used for learn， just for freshman of unique alg
  author    : atupal
  date      : 16/11/2013
'''

from login_weibo_rsa import Weibo

def main():
  weibo = Weibo()
  s = weibo.session
  with open('./result.raw') as fi:
    for url in fi:
      t = url.rstrip('\n')
      filename = t.split('/')[-1]
      try:
        with open('./ret/%s' % filename, 'w') as fimg:
          fimg.write(s.get(t).content)
        print filename
      except:
        print 'error'
        pass


if __name__ == '__main__':
  main()
