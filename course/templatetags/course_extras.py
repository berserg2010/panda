from django import template


register = template.Library()


@register.filter
def get_list_item(lst, index):
    try:
        return lst[index].datetime
    except IndexError:
        return '--'


@register.filter
def string_lines_to_list(string: str):
    try:
        return (line.strip() for line in string.splitlines() )
    except IndexError:
        return ''
