from django import template


register = template.Library()


@register.filter
def get_list_item(lst, index):
    try:
        return lst[index].datetime
    except IndexError:
        return '--'
