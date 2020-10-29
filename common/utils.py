

def hardware_inline(model):
    def wrapped(cls):

        cls.model = model
        cls.extra = 0

        return cls
    return wrapped
