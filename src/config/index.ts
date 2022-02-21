import { fetcher } from '../lib';

export const DEFAULT_SWR_CONFIG = {
  fetcher,
}

export const API_ENDPOINTS = {
  github: {
    search: 'https://api.github.com/search',
  }
}

const GT_LT_EQ = '([\>|\<]=?)?';
const YYYY = '(\\d{4})';
const MM = '(0?[1-9]|1[012])';
const DD = '((0[1-9]|[12]\\d|3[01])|[1-9])';
const DATE_FORMAT = `${YYYY}-${MM}-${DD}`;

export const SEARCH_QUERY_OPTIONS = {
  "user:<User Name>": { label: "Username", validation: `user:[a-z\\d](?:[a-z\\d]|-(?=[a-z\d])){0,38}` },
  "repos:<Repo Count>": { label: "Repo Count", validation: `repos:${GT_LT_EQ}\\d+(\\.\\.\\d)?` },
  "location:<City, State, ...>": { label: "Location", validation: `location:\\w+` },
  "language:<JavaScript, C#, ...>": { label: "Programming Language", validation: `language:\\S+` },
  "created:<YYYY-MM-DD>": { label: "Creation Date", validation: `created:${GT_LT_EQ}${DATE_FORMAT}(\\.\\.${DATE_FORMAT})?` },
  "followers:<Follower Count>": { label: "Followers", validation: `followers:${GT_LT_EQ}\\d+(\\.\\.\\d)?` },
}

export const STATIC_SEARCH_QUERY_OPTIONS = {
  "type:user": { label: "Search Users", validation: "type:user", disabled: false},
  "type:org": { label: "Search Organizations", validation: "type:org", disabled: false},
  "is:sponsorable": { label: "Has Sponsor Profile", validation: `followers:${GT_LT_EQ}\\d+(\\.\\.\\d)?` }
}
