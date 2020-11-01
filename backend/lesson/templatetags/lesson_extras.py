from django import template


register = template.Library()


@register.filter
def wrap_word_in_tag(string: str, word: str, tag: str = 'b'):

    new_string = []
    words = string.split()

    for s in words:

        if word.lower() in s.lower():
            s = f'<{tag}>{s}</{tag}>'

        new_string.append(s)

    return ' '.join(new_string)
