#!/usr/bin/python
# -*- encoding: utf-8 -*-
import socket
import sys

#创建一个缓冲区数组,同时递增它们

buffer=["A"]
counter=100
while len(buffer) <= 30:
    buffer.append("A"*counter)
    counter=counter+200

for string in buffer:
    print "Fuzzing PASS with %s bytes"%len(string)
    s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    connect=s.connect(('127.0.0.1',0))
    s.send(string)
    s.close()
