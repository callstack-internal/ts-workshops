import {Api} from '@src/services/Api';
import * as React from 'react';
import {Top250Data, Top250DataDetail} from '../types/api';

const testData = require('../../../test.json');

type useImdbTop250Result = {movies: Top250DataDetail[]};

const useImdbTop250 = (
  type: keyof typeof Api.URLs,
  skipApiCall: boolean = false,
): useImdbTop250Result => {
  const [movies, setMovies] = React.useState<Top250DataDetail[]>([]);

  React.useEffect(() => {
    (async function handleGet() {
      if (skipApiCall) {
        setMovies(testData);
        return;
      }

      const res = await Api.request<Top250Data>(Api.URLs[type]);

      if (res?.items && res.items.length > 0) {
        console.log(res.items);
        setMovies(res.items);
      }
    })();
  }, [type, skipApiCall]);

  return {movies};
};

export {useImdbTop250};
