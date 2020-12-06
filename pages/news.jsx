import Head from "next/head";
import React from "react";
import Layout, { siteTitle } from "../components/layout";
import BannerTop from "../components/BannerTop";
import NewsItems from "../components/NewsItems";
import PagePagination from "../components/PagePagination";
import NEWS_DATA from "../resources/news";
import BoltServices from "../services/boltServices";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import lscache from "lscache";

const boltServices = new BoltServices();

const useNews = () => {
	const newsArray = useSelector((state) => state.news.news);

	const dispatch = useDispatch();

	const acAddNews = (news) => {
		dispatch({
			type: "ADD_NEWS",
			news: news,
		});
	};

	return { newsArray, acAddNews };
};

News.getInitialProps = async () => {
	const news = await boltServices
		.getAllNews()
		.then((res) => {
			return res.data.MarketAction;
		})
		.catch((e) => console.error(e));

	return {
		news,
	};
};

export default function News(props) {
	const path_spans = "Новости";
	const path_link = [{ label: "Главная", path: "/" }];
	const { newsArray, acAddNews } = useNews();
	const { news } = props;

	const [isInitial, setIsInitial] = useState(false);

	useEffect(() => {
		acAddNews(news);
	}, []);

	useEffect(() => {
		setIsInitial(true);
	}, []);

	useEffect(() => {
		if (isInitial) {
			lscache.set("news", newsArray);
		}
	}, [newsArray]);

	return (
		<Layout>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className="news">
				<div className="banner_section">
					<div className="container">
						<BannerTop path_link={path_link} path_spans={path_spans} />
					</div>
				</div>
				<div className="container">
					<div className="news-cards">
						{newsArray ? <NewsItems news={newsArray} /> : null}
					</div>
					{/* <PagePagination /> */}
				</div>

				<style jsx>{`
					.news-cards {
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;
					}

					@media (max-width: 400px) {
						.news-cards {
							justify-content: center;
						}
					}
				`}</style>
			</section>
		</Layout>
	);
}
