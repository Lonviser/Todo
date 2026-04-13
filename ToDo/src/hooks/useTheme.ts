import { useState, useEffect } from "react";

export function useTheme(){
    const[isDark, setIsDark] = useState(()=>{
        if(localStorage.getItem('theme') === 'dark'){
            return true
        }
        if(localStorage.getItem('theme') === 'light'){
            return false
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    });

    useEffect(()=>{
        const root = window.document.documentElement;

        if(isDark){
            root.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        }else{
            root.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [isDark])

    const toggleTheme = () => {
        setIsDark(prev => !prev)
    }
    return ({
        isDark,
        toggleTheme
    })
    
}