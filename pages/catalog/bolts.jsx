import Head from "next/head";
import React from "react";
import BannerTop from "../../components/BannerTop";
import BoltServices from "../../services/boltServices";
import Layout, { siteTitle } from "../../components/layout";
import { useMediaQuery } from "react-responsive";
import GoodsContent from "../../components/GoodsContent";

const boltServices = new BoltServices();

Bolts.getInitialProps = async () => {
	const bolts = await boltServices
		.getAllBolts()
		.then((res) => {
			return res.data.ListOfTypes[0].StdList;
		})
		.catch((e) => console.error(e));

	return {
		bolts,
	};
};

function Bolts(props) {
	const isMobile = useMediaQuery({ query: "(max-width: 960px)" });
	const namePage = "bolts";
	const path_spans = "Болты с шестигранной головкой";
	const path_link = [
		{ label: "Главная", path: "/" },
		{ label: "Каталог", path: "/catalog" },
	];

	const { bolts } = props;

	return (
		<Layout>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className="bolts">
				<div className="banner_section">
					<div className="container">
						<BannerTop path_link={path_link} path_spans={path_spans} />
					</div>
				</div>

				<div className="about_section">
					<div className="container">
						<GoodsContent goods={bolts} namePage={namePage} />
					</div>
				</div>
				<style jsx>{`
					.sticky {
						position: sticky;
						top: 155px;
					}
				`}</style>
			</section>
		</Layout>
	);
}

export default Bolts;
