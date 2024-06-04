import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [datePage, setDatePage] = useState(defaultArticleState);
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': datePage.fontFamilyOption.value,
					'--font-size': datePage.fontSizeOption.value,
					'--font-color': datePage.fontColor.value,
					'--container-width': datePage.contentWidth.value,
					'--bg-color': datePage.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm date={datePage} setDate={setDatePage} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
