import CustomerInfoItem from "./CustomerInfoItem";
import { useState, useEffect } from "react";
import Spinner from "../../Spinner";
import BoltServices from "../../../services/boltServices";

const boltServices = new BoltServices();

export default function CustomerInfoBlock(props) {
	const { userId, customerInfo, headerOrg, acChangeCustomerInfo } = props;
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		if (userId !== "") {
			boltServices.getCustomerInfo(userId).then((data) => {
				acChangeCustomerInfo(data.data[0]);
				if (data.data[0].isFilial) {
					boltServices
						.getCustomerInfo(data.data[0].HeadClient_id)
						.then((data) => {
							acChangeHeaderOrg(data.data[0]);
							setIsLoading(false);
						});
				} else {
					setIsLoading(false);
				}
			});
		}
	}, [userId]);

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<table>
					{headerOrg ? (
						<CustomerInfoItem
							label={"Головная организация:"}
							name={headerOrg.FullName}
						/>
					) : null}
					<CustomerInfoItem
						label={"Краткое наименование:"}
						name={customerInfo.Name}
					/>
					<CustomerInfoItem
						label={"Полное наименование:"}
						name={customerInfo.FullName}
					/>
					<CustomerInfoItem label={`УНП: `} name={customerInfo.UNP} />
					<CustomerInfoItem label={`OKPO: `} name={customerInfo.OKPO} />
					<CustomerInfoItem
						label={"Расчетный счет"}
						name={customerInfo.AccNumber}
					/>
					<CustomerInfoItem label={"БИК банка:"} name={customerInfo.BIC} />
					<CustomerInfoItem label={"Банк:"} name={customerInfo.BankName} />
					<CustomerInfoItem label={"Адрес:"} name={customerInfo.Adress} />
					<CustomerInfoItem label={"Email:"} name={customerInfo.Email} />
					<CustomerInfoItem label={"Phone:"} name={customerInfo.Phone} />
					<CustomerInfoItem
						label={"ФИО руководителя:"}
						name={customerInfo.DirectorName}
					/>
					<CustomerInfoItem
						label={"Должность руководителя:"}
						name={customerInfo.DirectorPosition}
					/>
					<style jsx>{`
						.item_line {
							display: flex;
						}

						table {
							border-collapse: collapse;
							width: 420px;
							margin-bottom: 10px;
						}

						@media (max-width: 576px) {
							table {
								width: 320px;
								margin: 0 auto;
							}
						}

						@media (max-width: 400px) {
							table {
								width: 290px;
								margin: 0 auto;
							}
						}
					`}</style>
				</table>
			)}
		</>
	);
}
