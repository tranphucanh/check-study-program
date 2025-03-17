import styled from 'styled-components'

export const EditCell = styled.div`
	.editable-cell-value-wrap {
		padding: 5px 12px;
		cursor: pointer;
	}

	.editable-row:hover .editable-cell-value-wrap {
		padding: 4px 11px;
		border: 1px solid #d9d9d9;
		border-radius: 2px;
	}
	.select {
		max-width: 300px;
		width: 200px;
	}
	.supplier {
		max-width: 300px;
		width: 300px;
	}
`
