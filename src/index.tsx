// Libraries
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import viVN from "antd/locale/vi_VN";

// Components
import App from "./App";

// Store
import { store } from "@/store";
import { configAntd, componentToken } from "@/styles/theme";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { LicenseManager } from "ag-grid-enterprise";

LicenseManager.setLicenseKey(
	"DownloadDevTools_COM_NDEwMjM0NTgwMDAwMA==59158b5225400879a12a96634544f5b6"
);

const container = document.getElementById("root");
const root = createRoot(container as Element);

// Config dayjs
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

dayjs?.locale("vi");

root.render(
	<BrowserRouter>
		<ConfigProvider
			theme={{
				components: componentToken,
				token: configAntd,
			}}
			locale={viVN}
		>
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<App />
				</Provider>
			</ThemeProvider>
		</ConfigProvider>
	</BrowserRouter>
	// </React.StrictMode>
);
