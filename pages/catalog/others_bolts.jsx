import Head from "next/head";
import React from "react";
import BannerTop from "../../components/BannerTop";
import BoltServices from "../../services/boltServices";
import Layout, { siteTitle } from "../../components/layout";
import GoodsContent from "../../components/GoodsContent";

const boltServices = new BoltServices();

OtherBolts.getInitialProps = async () => {
	const otherBolts = await boltServices
		.getAllOtherBolts()
		.then((res) => {
			return res.data.ListOfTypes[0].StdList;
		})
		.catch((e) => console.error(e));

	return {
		otherBolts,
	};
};

function OtherBolts(props) {
	const namePage = "others_bolts";
	const path_spans = "Прочие болты";
	const path_link = [
		{ label: "Главная", path: "/" },
		{ label: "Каталог", path: "/catalog" },
	];

	const { otherBolts } = props;

	return (
		<Layout>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className="otherBolts">
				<div className="banner_section">
					<div className="container">
						<BannerTop path_link={path_link} path_spans={path_spans} />
					</div>
				</div>

				<div className="about_section">
					<div className="container">
						<GoodsContent goods={otherBolts} namePage={namePage} />
					</div>
				</div>
			</section>
		</Layout>
	);
}

export default OtherBolts;
