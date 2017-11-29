http://192.168.10.2/

https://github.com/yanghoon/node.git
http://www.rejetto.com/hfs/
https://marketplace.eclipse.org/content/easyshell#group-details


* node standard
https://www.npmjs.com/
http://node-modules.com/
http://expressjs.com/ko/

* node deep dive
http://programmingsummaries.tistory.com/340
http://unikys.tistory.com/309

* express
http://bits-and-kites.blogspot.kr/2015/03/spring-and-nodejs


* ANTLR
https://tomassetti.me/antlr-and-the-web/
https://github.com/grosenberg/AntlrDT
https://github.com/antlr/grammars-v4


* Java CPU
http://wp.goodchois.kr/devtip/archives/344
http://mindseye.tistory.com/57
http://kor-khkim.blogspot.kr/2013/09/os-thread-cpu.html
https://www.ibm.com/support/knowledgecenter/ko/SSYKE2_6.0.0/com.ibm.java.doc.60_26/vm626/J9/RAS/javadump_tags_threads.html
http://www.shop-wiz.com/board/view/root/java01/tid/250/category/0
http://d2.naver.com/helloworld/10963
http://tech.whatap.io/2015/09/03/linux-monitoring/
http://theeye.pe.kr/archives/1450



* 3-4
IWS
https://www.youtube.com/watch?time_continue=34&v=nPWbVXM5nAE
https://www.youtube.com/watch?v=EGKS9TfwrMo

JUK
https://www.youtube.com/watch?v=boPo6TpC_Cw

Control
http://www.hungryapp.co.kr/bbs/bbs_view.php?pid=17702&bcode=girlsfrontline&catecode=002

ARs
https://www.youtube.com/watch?v=tnprlSWcocs










[putty]
https://terminal.sexy/

[git]
#https://help.github.com/articles/cloning-a-repository/

ubuntu@ip-172-31-6-151:~$ pwd
/home/ubuntu
ubuntu@ip-172-31-6-151:~$ git clone https://github.com/yanghoon/node
Cloning into 'node'...
remote: Counting objects: 185, done.
remote: Compressing objects: 100% (106/106), done.
remote: Total 185 (delta 85), reused 161 (delta 61), pack-reused 0
Receiving objects: 100% (185/185), 37.11 KiB | 0 bytes/s, done.
Resolving deltas: 100% (85/85), done.
Checking connectivity... done.
ubuntu@ip-172-31-6-151:~$ ls -l
total 8
drwxrwxr-x 5 ubuntu ubuntu 4096 Nov 29 05:23 node
drwxrwxr-x 7 ubuntu ubuntu 4096 Nov 29 05:14 server
ubuntu@ip-172-31-6-151:~$ cd node
ubuntu@ip-172-31-6-151:~/node$ ls -l
total 20
drwxrwxr-x 7 ubuntu ubuntu 4096 Nov 29 05:23 express4-node
drwxrwxr-x 6 ubuntu ubuntu 4096 Nov 29 05:23 express-node
-rw-rw-r-- 1 ubuntu ubuntu 1674 Nov 29 05:23 node.pem
-rw-rw-r-- 1 ubuntu ubuntu 1438 Nov 29 05:23 node.ppk
-rw-rw-r-- 1 ubuntu ubuntu 1483 Nov 29 05:23 readme.txt
ubuntu@ip-172-31-6-151:~/node$


ubuntu@ip-172-31-6-151:~/bin$ pwd
/home/ubuntu/bin
ubuntu@ip-172-31-6-151:~/bin$ cat start.sh
#!/bin/bash

forever start ~/server/bin/www
ubuntu@ip-172-31-6-151:~/bin$ cat shutdown.sh
#!/bin/bash

forever stop ~/server/bin/www
ubuntu@ip-172-31-6-151:~/bin$ cat deploy.sh
#!/bin/bash

cd ~/node && git pull
cd ~/server

npm install

forever restartall



[node intsll]
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo npm install forever -g





