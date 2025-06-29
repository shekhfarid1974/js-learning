function appData() {
  return {
    activeTab: 'calls',
    callLogs: [],

    // Fields
    applicantNo: '',
    callId: '',
    agentNo: '',
    didNo: '',
    callType: 'inbound',
    startTime: '',
    endTime: '',
    callDuration: '',
    status: '',

    // Responses
    counsellorResponse: {},
    opportunityResponse: {},
    callNotificationResponse: {},
    callBackResponse: {},

    async testGetCounsellor() {
      const res = await axios.post('https://services.in8.nopaperforms.com/webhooks/v1/13c3db68f26fe3a9997e6164dce63448/getCounsellor ', {
        applicant_no: this.applicantNo
      });
      this.counsellorResponse = res.data;
    },

    async testGetOpportunity() {
      const res = await axios.post('https://services.in8.nopaperforms.com/webhooks/v1/13c3db68f26fe3a9997e6164dce63448/getOpportunity ', {
        applicant_no: this.applicantNo
      });
      this.opportunityResponse = res.data;
    },

    async testIvrCallNotification() {
      const res = await axios.post('https://services.in8.nopaperforms.com/webhooks/v1/13c3db68f26fe3a9997e6164dce63448/ivrCallNotification ', {
        call_id: this.callId,
        agent_no: this.agentNo,
        applicant_no: this.applicantNo,
        did_no: this.didNo,
        call_type: this.callType
      });
      this.callNotificationResponse = res.data;
    },

    async testIvrCallBackDetails() {
      const res = await axios.post('https://services.in8.nopaperforms.com/webhooks/v1/13c3db68f26fe3a9997e6164dce63448/ivrCallBackDetails ', {
        call_id: this.callId,
        agent_no: this.agentNo,
        applicant_no: this.applicantNo,
        did_no: this.didNo,
        call_type: this.callType,
        start_time: this.startTime,
        end_time: this.endTime,
        call_duration: this.callDuration,
        status: this.status,
        resource_url: 'example.com',
      });
      this.callBackResponse = res.data;
    }
  };
}