Copy this folder elsewhere & run form there eg ~/myob-test-server
because it can disappear depending on the branch.

in /etc/rc.local, add..
sudo -u ec2-user /home/ec2-user/myob-test-server/start-server

To run:

./start-server


