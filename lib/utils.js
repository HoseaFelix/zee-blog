// ============================================
// src/lib/utils.js
// ============================================
// lib/utils.js
import { parseISO, format } from 'date-fns';

export function formatDate(dateString) {
  if (!dateString) return 'Unknown date';
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString);
    if (Number.isNaN(date.getTime())) return 'Unknown date';
    return format(date, 'MMMM d, yyyy');
  } catch (err) {
    return 'Unknown date';
  }
}



export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function truncate(text, length = 160) {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

export function paginateArray(array, page, perPage = 9) {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  
  return {
    data: array.slice(startIndex, endIndex),
    totalPages: Math.ceil(array.length / perPage),
    currentPage: page,
    totalItems: array.length,
  };
}

export function getExcerpt(content, length = 200) {
  const text = content
    .replace(/#+\s/g, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/[*_~`]/g, '')
    .trim();
  
  return truncate(text, length);
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}