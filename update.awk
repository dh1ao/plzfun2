BEGIN {
    print "use it like so...\n"
    print "cat package.json|awk -f update.awk\n\n"
    print "maybe you need a sudo apt-get install gawk"
    print "mawk didn't work with debian gensub is missing so use gawk"
}

{
    lo=tolower($0)
    lo =gensub(/"/, "", "g", lo)
    if (match(lo,/node-red-[a-z-]+/)>0 )
    {
        split(lo,a,":");
        cmd=sprintf("node-red admin install %-70s",a[1]);
        system(cmd)
    }
    else
        print("");
}

END {
    
}