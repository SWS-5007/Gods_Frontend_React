import * as React from 'react';
import { useParams } from 'react-router-dom';
import NewsDetail from './NewsDetail';
import NewsList from './NewsList';

export default function News() {
    const { id } = useParams()
    return id
        ? <NewsDetail />
        : <NewsList />;
}
