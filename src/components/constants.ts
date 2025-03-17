// Models
import { ValidationForm } from "@/models";
import { Rule } from "antd/lib/form";

export const validationForm = (label: string, validation?: ValidationForm) => {
	if (!!validation) {
		let rules: Rule[] = [];
		if (validation.required) {
			rules.push({
				required: validation.required,
				message: `${label} không được để trống!`,
			});
		}
		if (validation.percentage) {
			rules.push({
				validator: (_, value) => {
					if (
						(value && isNaN(value)) ||
						parseFloat(value) < 0 ||
						parseFloat(value) > 100
					) {
						return Promise.reject(
							new Error("Vui lòng nhập một giá trị phần trăm (0-100).")
						);
					}

					return Promise.resolve();
				},
			});
		}

		if (validation.messError) {
			rules.push({
				validator: () => {
					const messError = validation.messError;

					if (messError && typeof messError === "string") {
						return Promise.reject(new Error(`${messError}`));
					}

					return Promise.resolve();
				},
			});
		}

		if (validation.maxValue !== null && validation.maxValue !== undefined) {
			rules.push({
				validator: (_, value) => {
					const maxValue = validation?.maxValue || 0;

					if ((value && isNaN(value)) || parseFloat(value) > maxValue) {
						return Promise.reject(
							new Error(`${label} không được lớn hơn ${maxValue}`)
						);
					}

					return Promise.resolve();
				},
			});
		}
		// min number can be 0
		if (validation.minValue !== null && validation.minValue !== undefined) {
			rules.push({
				validator: (_, value) => {
					const minValue = validation?.minValue || 0;
					if ((value && isNaN(value)) || parseFloat(value) < minValue) {
						return Promise.reject(
							new Error(`${label} không được nhỏ hơn ${minValue}`)
						);
					}

					return Promise.resolve();
				},
			});
		}

		if (validation.max) {
			rules.push({
				validator: (_, value) => {
					const maxLength = validation?.max || 0;
					if (value.toString().length > maxLength) {
						return Promise.reject(
							new Error(`${label} không được lớn hơn ${maxLength} ký tự`)
						);
					}
					return Promise.resolve();
				},
			});
		}
		if (validation.min) {
			rules.push({
				min: validation.min,
				message: `${label} không được nhỏ hơn ${validation.min} ký tự`,
			});
		}
		if (validation.type) {
			rules.push({
				type: validation.type,
				message: `${label} không phải là kiểu ${validation.type}`,
			});
		}
		if (validation.length) {
			rules.push({
				len: validation.length,
				message: `${label} phải có ${validation.length} ký tự`,
			});
		}

		if (validation.match) {
			rules.push(({ getFieldValue }) => ({
				validator(_, value) {
					if (
						!value ||
						getFieldValue(validation?.match?.name || "") === value
					) {
						return Promise.resolve();
					}
					return Promise.reject(
						new Error(
							`${label} phải trùng giá trị với ${validation?.match?.label} `
						)
					);
				},
			}));
		}

		if (validation.notMatch) {
			rules.push(({ getFieldValue }) => ({
				validator(_, value) {
					if (
						!value ||
						getFieldValue(validation?.notMatch?.name || "") !== value
					) {
						return Promise.resolve();
					}
					return Promise.reject(
						new Error(
							`${label} không được trùng giá trị với ${validation?.notMatch?.label} `
						)
					);
				},
			}));
		}

		if (validation?.maxSelections && !Number.isNaN(validation.maxSelections)) {
			rules.push({
				validator: (_, value) => {
					const { maxSelections = 0 } = validation;
					if (maxSelections < (value?.length || 0)) {
						return Promise.reject(
							new Error(
								`${label} không được nhiều hơn ${maxSelections} giá trị`
							)
						);
					}

					return Promise.resolve();
				},
			});
		}

		if (validation?.minSelections && !Number.isNaN(validation.minSelections)) {
			rules.push({
				validator: (_, value) => {
					const { minSelections = 0 } = validation;
					if (minSelections > (value?.length || 0)) {
						return Promise.reject(
							new Error(`${label} không được ít hơn ${minSelections} giá trị`)
						);
					}

					return Promise.resolve();
				},
			});
		}
		return rules;
	}
	return [];
};
