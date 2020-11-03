//	库房管理
import {COMMIT_INTERFACE} from "@/store";

interface STATE {
	//	编辑病人基础信息的值
	patientBasicInfo: any;
	//	群聊信息
	//	⚠️暂时不要，上面的对象一起存了，但也先保留
	groupChatMessage: any;

	//	筛选 - 信息
	screeningInfo: any;
	//	病程记录 - 弹框id
	progressNoteId: number;
	//	患者反馈 - 弹框id
	patientReplyId: number;
	//	活动小结 - 弹框id
	activityBriefId: number;
}

//	有id，就是编辑了
const state: STATE = {
	//	必须是对象，否则麻烦
	patientBasicInfo: {
		hospitalTreatment: undefined,
	},
	groupChatMessage: null,

	screeningInfo: {},


	progressNoteId: 0,
	patientReplyId: 0,
	activityBriefId: 0,
}
const mutations = {
	SET_PATIENT_BASIC_INFO: (state: STATE, patientBasicInfo: any) => {
		state.patientBasicInfo = patientBasicInfo || {};
	},
	SET_GROUP_CHAT_MESSAGE: (state: STATE, groupChatMessage: any) => {
		state.groupChatMessage = groupChatMessage;
	},
	SET_SCREENING_INFO: (state: STATE, screeningInfo: any) => {
		state.screeningInfo = screeningInfo;
	},
	SET_PROGRESS_NOTE: (state: STATE, progressNoteId: number) => {
		state.progressNoteId = progressNoteId;
	},
	SET_PATIENT_REPLY_ID: (state: STATE, patientReplyId: number) => {
		state.patientReplyId = patientReplyId;
	},
	SET_ACTIVITY_BRIEF_ID: (state: STATE, activityBriefId: number) => {
		state.activityBriefId = activityBriefId;
	},
}

const actions = {
	setPatientBasicInfo: ({commit}: COMMIT_INTERFACE<STATE>, patientBasicInfo: any) => {
		if (!patientBasicInfo) {
			commit('SET_PATIENT_BASIC_INFO', {});
			return;
		}
		//	修正数据type
		patientBasicInfo.doctorId = patientBasicInfo.doctorId.toString() || '';
		patientBasicInfo.departTreatment = Number(patientBasicInfo.departTreatment) || undefined;
		patientBasicInfo.hospitalTreatment = Number(patientBasicInfo.hospitalTreatment) || undefined;
		commit('SET_PATIENT_BASIC_INFO', patientBasicInfo);
	},
	setGroupChatMessage: ({commit}: COMMIT_INTERFACE<STATE>, groupChatMessage: any) => {
		commit('SET_GROUP_CHAT_MESSAGE', groupChatMessage);
	},
	setScreeningInfo: ({commit}: COMMIT_INTERFACE<STATE>, screeningInfo: any) => {
		commit('SET_SCREENING_INFO', screeningInfo);
	},
	setProgressNoteId: ({commit}: COMMIT_INTERFACE<STATE>, progressNoteId: number) => {
		commit('SET_PROGRESS_NOTE', progressNoteId);
	},
	setPatientReplyId: ({commit}: COMMIT_INTERFACE<STATE>, patientReplyId: number) => {
		commit('SET_PATIENT_REPLY_ID', patientReplyId);
	},
	setActivityBriefId: ({commit}: COMMIT_INTERFACE<STATE>, activityBriefId: number) => {
		commit('SET_ACTIVITY_BRIEF_ID', activityBriefId);
	},
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
