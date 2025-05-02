// place files you want to import through the `$lib` alias in this folder.
import PocketBase, { type RecordModel } from 'pocketbase';
export const pb = new PocketBase('http://3.109.250.92:8090');
export const serializeNonPOJOs = (obj: any) => {
	return JSON.parse(JSON.stringify(obj));
};
export const isAuthenticated = () => {
	return !!pb.authStore.token;
};
export const logout = () => {
	pb.authStore.clear();
};
export function formattedDate(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
	const day = String(date.getDate()).padStart(2, '0');
	const hour = String(date.getHours()).padStart(2, '0');
	const minute = String(date.getMinutes()).padStart(2, '0');
	const second = String(date.getSeconds()).padStart(2, '0');

	return `${year}${month}${day}${hour}${minute}${second}`;
}

export function downloadOnClick(blob: Blob, fileName: string) {
	const link = document.createElement('a');
	const url = URL.createObjectURL(blob);
	link.href = url;
	link.download = fileName;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

export const parseJwt = (token: string) => {
	try {
		return JSON.parse(atob(token.split('.')[1]));
	} catch (e) {
		return null;
	}
};

export interface Profile extends RecordModel {
	avatar: string;
	companyId: string;
	companyName: string;
	created: string;
	email: string;
	emailVisibility: boolean;
	name: string;
	roles: string;
	updated: string;
	verified: boolean;
	features: string[];
}

export interface FamilyRecord extends RecordModel {
	fullName: string;
	addressLine?: string;
	veda?: string;
	category?: string;
	subCategory?: string;
	gothra?: string;
	area?: string;
	taluk?: string;
	profession?: string;
	phoneNumber?: string;
	emailAddress?: string;
}

export interface CreateUpdateFamilyRecord {
	id?: string;
	fullName: string;
	addressLine: string;
	veda: string;
	category: string;
	subCategory: string;
	gothra: string;
	area: string;
	taluk: string;
	profession: string;
	phoneNumber: string;
	emailAddress: string;
}

export interface MemberRecord extends RecordModel {
	fullName: string;
	relatedAs?: string;
	isMarried: 'married' | 'unmarried';
	age?: number;
	familyId: string;
	educationProfession?: string;
	phoneNumber?: string;
	emailAddress?: string;
}

export interface CreateUpdateMemberRecord {
	id?: string;
	fullName: string;
	relatedAs?: string;
	isMarried: 'married' | 'unmarried';
	age?: number;
	educationProfession?: string;
	phoneNumber?: string;
	emailAddress?: string;
	familyId: string;
}

export interface PaymentRecord extends RecordModel {
	slNo?: string;
	narration?: string;
	paymentDate?: string;
	receivedFrom?: string;
	receivedBy?: string;
	paymentRef?: string;
	paymentRefFile?: File;
	paidTo?: string;
	paidOn: 'Cash' | 'Cheque' | 'DD' | 'UPI' | 'NEFT' | 'RTGS';
	paymentType: 'Receipt' | 'Voucher';
	amount: number;
}

export interface CreateUpdatePaymentRecord {
	id?: string;
	slNo?: string;
	narration?: string;
	paymentDate?: string;
	receivedFrom?: string;
	receivedBy?: string;
	paymentRef?: string;
	paymentRefFile?: File;
	paidTo?: string;
	paidOn: 'Cash' | 'Cheque' | 'DD' | 'UPI' | 'NEFT' | 'RTGS';
	paymentType: 'Receipt' | 'Voucher';
	amount: number;
}

export interface AddressLine {
	addressLine1: string;
	area: string;
	taluk: string;
	pinCode: string;
}

export interface CreateUpdateCustomerRecord {
	id?: string;
	fullName: string;
	addressLine: AddressLine;
	phoneNumber: string;
	panNo: string;
}

export interface CustomerRecord extends RecordModel {
	fullName: string;
	addressLine: string;
	phoneNumber: string;
	panNo: string;
}

export const isFeatureEnabled = (features: string[], feature: string) => features.includes(feature);

export const isSurveyFeatureEnabled = (features: string[]) =>
	isFeatureEnabled(features ?? [], 'Survey');
export const isDMSFeatureEnabled = (features: string[]) => isFeatureEnabled(features ?? [], 'DMS');
export const isPaymentFeatureEnabled = (features: string[]) =>
	isFeatureEnabled(features ?? [], 'Payment');
