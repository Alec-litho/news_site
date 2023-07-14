"use client"
import { useDispatch, useSelector } from "react-redux"
import {setNews} from "../features/searchSlice"
import { useAppDispatch, useAppSelector } from './reduxCustomHooks';


export default function useRefresh(): ()=> void {
    const dispatch = useAppDispatch()
    return function():void {
        dispatch(setNews({news:[], articlesAmount:0}))
    }
}