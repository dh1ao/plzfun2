BEGIN {
    OFS="|"
}

{
    lo=tolower($0)
    pos=match(lo, /node-red/)
    print pos
}

END {
    
}