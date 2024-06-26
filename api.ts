import { QueryFunction } from 'react-query';

const BASE_URL = 'https://api.themoviedb.org/3/';

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZmI1ZWRjZjZlYmEwMGIwOThjMjkzMjBlYzNhYzRiNyIsIm5iZiI6MTcxOTMxMzk2My41NDkwOTcsInN1YiI6IjY2N2FhNTNjMDhiODY1ZTAzNDVhMzJlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Wh92Hh3-T5x04QYqJJTwfV5wdMsvl9eSQodXgOQC5jw'
	}
};

export interface Movie {
	adult: boolean;
	backdrop_path: string | null;
	id: number;
	title: string;
	original_language: string;
	original_title: string;
	overview: string;
	poster_path: string | null;
	media_typ: string;
	genre_ids: number[];
	popularity: number;
	release_date: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

interface BaseResponse {
	page: number;
	total_results: number;
	total_pages: number;
}

export interface MovieResponse extends BaseResponse {
	results: Movie[];
}

type MovieListResponse = QueryFunction<MovieResponse>;

interface MovieFetchers {
	nowPlaying: MovieListResponse;
	upComing: MovieListResponse;
	trending: MovieListResponse;
}

export const moviesApi = {
	nowPlaying: () =>
		fetch(`${BASE_URL}movie/now_playing?language=en-US&page=1`, options).then(
			(res) => res.json()
		),
	upComing: () =>
		fetch(`${BASE_URL}movie/upcoming?language=en-US&page=1`, options).then(
			(res) => res.json()
		),
	trending: () =>
		fetch(`${BASE_URL}trending/movie/week?language=en-US`, options).then(
			(res) => res.json()
		)
};

export const tvApi = {
	airingToday: () =>
		fetch(`${BASE_URL}tv/airing_today?language=en-US&page=1`, options).then(
			(res) => res.json()
		),
	topRated: () =>
		fetch(`${BASE_URL}tv/top_rated?language=en-US&page=1`, options).then(
			(res) => res.json()
		),
	trending: () =>
		fetch(`${BASE_URL}trending/tv/week?language=en-US`, options).then((res) =>
			res.json()
		)
};
