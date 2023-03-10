const tooltip = {
    // eslint-disable-next-line no-undef
    mounted: (el, {value}) => M.Tooltip.init(el, {html: value}),
    unmounted: (el) => {
        // eslint-disable-next-line no-undef
        const tooltip = M.Tooltip.getInstance(el)
        if (tooltip && tooltip.destroy) {
            tooltip.destroy()
        }
    }
}

export default {
    tooltip
}