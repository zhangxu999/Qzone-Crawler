def removenextline(fname,newfname):
    f=open(fname,'r')
    all=""
    for x in f.read():
        if x!="\n":
            all+=x
    fnew=open(newfname,'w')
    fnew.write(all)
    fnew.close()
    f.close()
