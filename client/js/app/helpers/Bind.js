class Bind {
    constructor(model, view, ...props){
        view.update(model);
        return ProxyFactory.create(model, props, () => view.update(model));
    }
}