import Head from "next/head";
import React from "react";
import BannerTop from "../components/BannerTop";
import CatalogCards from "../components/CatalogCards";
import CATALOG_ITEMS from "../resources/categories";
import Layout, { siteTitle } from "../components/layout";
import BoltServices from "../services/boltServices";

const boltServices = new BoltServices();

// Catalog.getInitialProps = async () => {
// 	const goods = await boltServices.getAllType().then((res) => {
// 		return res;
// 	});

// 	return {
// 		goods,
// 	};
// };

function Catalog(props) {
	const path_spans = "Каталог";
	const path_link = [{ label: "Главная", path: "/" }];

	return (
		<Layout>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className="hero">
				<div className="banner_section">
					<div className="container">
						<BannerTop path_link={path_link} path_spans={path_spans} />
					</div>
				</div>
				<div className="catalog">
					<div className="container">
						<div className="box">
							<CatalogCards cards={CATALOG_ITEMS} />
						</div>
					</div>
				</div>
			</section>
			<style jsx>{`
				.catalog {
					padding: 10px 0;
				}
			`}</style>
		</Layout>
	);
}
export default Catalog;
