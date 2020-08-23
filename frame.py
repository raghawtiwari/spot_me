import cv2
i=0
import os
cap= cv2.VideoCapture('./test.mp4')
i=0
cwd=os.getcwd()
os.mkdir(str(cwd) + '/frmaes1')
os.chdir(str(cwd) + '/frmaes1')
while(cap.isOpened()):
    ret, frame = cap.read()
    if ret == False:
        break
    cv2.imwrite(str(i)+'.jpg',frame)
    i+=1
cap.release()
cv2.destroyAllWindows()
