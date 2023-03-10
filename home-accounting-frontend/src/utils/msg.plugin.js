import localizeFilter from "@/filters/localize.filter"

export default {
    // eslint-disable-next-line no-unused-vars
    install(app, options) {
        app.config.globalProperties.$message = function (htmlTextTag) {
            // eslint-disable-next-line no-undef
            M.toast({html: `${localizeFilter(htmlTextTag)}`})
        }
        app.config.globalProperties.$error = function (htmlTextTag) {
            // eslint-disable-next-line no-undef
            M.toast({html: `${localizeFilter('Error')}: ${localizeFilter(htmlTextTag)}`})
        }
    }
}