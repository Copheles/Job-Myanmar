export const Populate = (field) => function (next) {
    this.populate(field);
    next();
};
