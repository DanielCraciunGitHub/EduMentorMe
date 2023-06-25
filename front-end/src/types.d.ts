interface ApiResponse {
    data: {
      id: number;
      attributes: {
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        title: string;
        body: string;
        url: string,
      };
    }[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  }