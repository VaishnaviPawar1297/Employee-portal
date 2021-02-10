from myapp.models import EmployeeDetails,EmployeeDesignation
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
no_of_items_per_page = 5


class Pagination:

    def __init__(self, model, query_dict, serializer=None, query=None, sort=None):
        self.model = model
        self.query_dict = query_dict
        self.query = query or {}
        self.sort = sort
        self.total_pages = 0
        self.initial_no = 0
        self.total_count = 0
        self.serializer = serializer
        self.current_page = int(self.query_dict.get('pageNum', 1))

    def get_limit(self):
        if self.current_page <= self.total_pages:
            self.initial_no = (self.current_page - 1) * no_of_items_per_page

    def query_evaluator(self):
        self.total_count = self.model.objects.filter(**self.query).count()
        self.total_pages = self.total_count / no_of_items_per_page
        self.get_limit()
        data = self.model.objects.filter(**self.query)[self.initial_no:self.initial_no + no_of_items_per_page]
        if self.serializer:
            data = self.serializer(data, many=True).data
        return data

    def paginate(self):
        data = self.query_evaluator()
        paginated_data = {
            "data": data,
            "currentPage": self.current_page,
            "totalPages": self.total_pages,
            "totalCount": self.total_count
        }
        return paginated_data
