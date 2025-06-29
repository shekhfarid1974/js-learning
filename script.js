function app() {
  return {
    darkMode: false,
    activeTab: 'calls',
    callLogs: [],
    filterQuery: '',

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

    toast: {
      show: false,
      message: ''
    },

    // Computed properties
    get filteredCalls() {
      if (!this.filterQuery) return this.callLogs;
      const q = this.filterQuery.toLowerCase();
      return this.callLogs.filter(call =>
        call.applicant_no.includes(q) || call.agent_no.includes(q)
      );
    },

    // Init
    init() {
      this.fetchCallLogs();
      setInterval(() => this.fetchCallLogs(), 10000); // Poll every 10 seconds
    },

    async fetchCallLogs() {
      try {
        // Replace with actual endpoint that returns call logs
        const res = await axios.get('https://jsonplaceholder.typicode.com/comments?_limit=10');
        this.callLogs = res.data.map((c, i) => ({
          call_id: `call-${i + 1}`,
          agent_no: `730339321${i % 10}`,
          applicant_no: `999999999${i % 10}`,
          did_no: `1234567890`,
          status: i % 2
        }));
      } catch (e) {
        console.error('Error fetching call logs', e);
      }
    },

    showToast(message) {
      this.toast = { show: true, message };
      setTimeout(() => this.toast.show = false, 3000);
    },

    exportToCSV() {
      let csv = "Call ID,Agent,Applicant,Status\n";
      this.filteredCalls.forEach(call => {
        csv += `${call.call_id},${call.agent_no},${call.applicant_no},${call.status == 1 ? 'Success' : 'Failed'}\n`;
      });
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'call_logs.csv';
      a.click();
      URL.revokeObjectURL(url);
    },

    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      document.documentElement.classList.toggle('dark');
    },

    async testGetCounsellor() {
      try {
        const res = await axios.post(' https://services.in8.nopaperforms.com/webhooks/v1/13c3db68f26fe3a9997e6164dce63448/getCounsellor ', {
          applicant_no: this.applicantNo
        });
        this.counsellorResponse = res.data;
        this.showToast('getCounsellor API Success!');
      } catch (e) {
        this.showToast('getCounsellor API Failed!');
        this.counsellorResponse = e.response?.data || { error: 'Network Error' };
      }
    },

    async testGetOpportunity() {
      try {
        const res = await axios.post('https://services.in8.nopaperforms.com/webhooks/v1/13c3db68f26fe3a9997e6164dce63448/getOpportunity ', {
          applicant_no: this.applicantNo
        });
        this.opportunityResponse = res.data;
        this.showToast('getOpportunity API Success!');
      } catch (e) {
        this.showToast('getOpportunity API Failed!');
        this.opportunityResponse = e.response?.data || { error: 'Network Error' };
      }
    },

    async testIvrCallNotification() {
      try {
        const res = await axios.post('https://services.in8.nopaperforms.com/webhooks/v1/13c3db68f26fe3a9997e6164dce63448/ivrCallNotification ', {
          call_id: this.callId,
          agent_no: this.agentNo,
          applicant_no: this.applicantNo,
          did_no: this.didNo,
          call_type: this.callType
        });
        this.callNotificationResponse = res.data;
        this.showToast('ivrCallNotification API Success!');
      } catch (e) {
        this.showToast('ivrCallNotification API Failed!');
        this.callNotificationResponse = e.response?.data || { error: 'Network Error' };
      }
    },

    async testIvrCallBackDetails() {
      try {
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
          resource_url: 'example.com'
        });
        this.callBackResponse = res.data;
        this.showToast('ivrCallBackDetails API Success!');
      } catch (e) {
        this.showToast('ivrCallBackDetails API Failed!');
        this.callBackResponse = e.response?.data || { error: 'Network Error' };
      }
    },
  };
}

function app() {
  return {
    activeTab: 'calls',
    sidebarOpen: false,
    darkMode: false,

    // Filters
    filterQuery: '',
    filterType: '',
    filterStartDate: '',
    filterEndDate: '',

    // Pagination
    currentPage: 1,
    pageSize: 10,

    // Sample data
    callLogs: [
      { call_id: 'call-123', agent_no: '7303393210', applicant_no: '9999999999', did_no: '1234567890', call_type: 'inbound', status: 1, start_time: '2024-06-20 10:00:00' },
      { call_id: 'call-124', agent_no: '7303393211', applicant_no: '9999999998', did_no: '1234567891', call_type: 'outbound', status: 0, start_time: '2024-06-20 10:05:00' },
      // Add more sample data as needed...
    ],

    get filteredCalls() {
      return this.callLogs.filter(call => {
        const queryMatch = this.filterQuery ?
          call.applicant_no.includes(this.filterQuery) || call.agent_no.includes(this.filterQuery)
          : true;

        const typeMatch = this.filterType ? call.call_type === this.filterType : true;

        const dateMatch = () => {
          if (!this.filterStartDate && !this.filterEndDate) return true;
          const callDate = new Date(call.start_time);
          const start = this.filterStartDate ? new Date(this.filterStartDate) : null;
          const end = this.filterEndDate ? new Date(this.filterEndDate) : null;

          if (start && end) {
            return callDate >= start && callDate <= end;
          } else if (start) {
            return callDate >= start;
          } else if (end) {
            return callDate <= end;
          }
          return true;
        };

        return queryMatch && typeMatch && dateMatch();
      });
    },

    get totalPages() {
      return Math.ceil(this.filteredCalls.length / this.pageSize);
    },

    get paginatedCalls() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredCalls.slice(start, end);
    },

    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },

    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },

    exportToCSV() {
      let csv = "Call ID,Agent,Applicant,DID,Call Type,Status,Start Time\n";
      this.filteredCalls.forEach(call => {
        csv += `${call.call_id},${call.agent_no},${call.applicant_no},${call.did_no},${call.call_type},${call.status == 1 ? 'Success' : 'Failed'},${call.start_time}\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'call_logs.csv';
      a.click();
      URL.revokeObjectURL(url);
    }
  };
}