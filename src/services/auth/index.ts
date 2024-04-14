import httpRequest from '@/configs/api.config';

export const fetchApi = async () => {
  const res = await httpRequest.get(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=ebbbc1275ff4dd79baff029b2f236e41',
  );
  console.log(res.data);
};
