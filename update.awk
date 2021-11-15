BEGIN {
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