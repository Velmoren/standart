import Head from "next/head";
import React from "react";
import Layout, { siteTitle } from "../components/layout";
import BannerTop from "../components/BannerTop";
import CartBody from "../components/CartBody";

export default function Cart() {
	const path_spans = "Корзина";
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

				<div className="cart">
					<div className="container">
						<div className="box">
							<CartBody />
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
}
