"use client"
import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import axios from 'axios';
import { URL } from '@/service/resquest';

interface TagNavbarType {
  id:string;
  title:string;
}

interface PropsType {
  setTagNavbarId:(key:string) => void
}

const TabsList: React.FC<PropsType> = ({setTagNavbarId}) => {

  const onChange = (key: string) => {
    setTagNavbarId(key);
  };
  
  const [items, setItems] = useState([
    {
      key: '1',
      label: 'Tab 1',
    },
    {
      key: '2',
      label: 'Tab 2',
    },
    {
      key: '3',
      label: 'Tab 3',
    },
  ])

  useEffect(() => {
    axios.get(`${URL}/tag-navbar`).then(res => {
      setItems(res.data.map((item: TagNavbarType) => ({key:item.id, label:item.title})))
    })
  }, [])
  
  return (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  )
};

export default TabsList;